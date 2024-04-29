package com.techbank.account.query.api.controllers;

import com.techbank.account.query.api.dto.AccountResponse;
import com.techbank.account.query.api.dto.EqualityType;
import com.techbank.account.query.api.queries.FindAccountByHolderQuery;
import com.techbank.account.query.api.queries.FindAccountByIdQuery;
import com.techbank.account.query.api.queries.FindAccountsWithBalanceQuery;
import com.techbank.account.query.api.queries.FindAllAccountsQuery;
import com.techbank.account.query.domain.BankAccount;
import com.techbank.cqrs.core.infrastructure.QueryDispatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping(path = "/api/v1/bankAccountLookup")
public class AccountLookupController {
    private final Logger logger = Logger.getLogger(AccountLookupController.class.getName());

    private final QueryDispatcher queryDispatcher;

    public AccountLookupController(QueryDispatcher queryDispatcher) {
        this.queryDispatcher = queryDispatcher;
    }

    @GetMapping(path = "/")
    public ResponseEntity<AccountResponse> getAllAccounts() {
        try {
            List<BankAccount> accounts = queryDispatcher.send(new FindAllAccountsQuery());
            return buildAccountsResponseEntity(accounts);
        } catch (Exception e) {
            return buildErrorResponse("Failed to complete get all accounts request!", e);
        }
    }

    @GetMapping(path = "/byId/{id}")
    public ResponseEntity<AccountResponse> getAccountById(@PathVariable(value = "id") String id) {
        try {
            List<BankAccount> accounts = queryDispatcher.send(new FindAccountByIdQuery(id));
            return buildAccountsResponseEntity(accounts);
        } catch (Exception e) {
            return buildErrorResponse("Failed to complete get account by id request!", e);
        }
    }

    @GetMapping(path = "/byHolder/{accountHolder}")
    public ResponseEntity<AccountResponse> getAccountByHolder(@PathVariable(value = "accountHolder") String accountHolder) {
        try {
            List<BankAccount> accounts = queryDispatcher.send(new FindAccountByHolderQuery(accountHolder));
            return buildAccountsResponseEntity(accounts);
        } catch (Exception e) {
            return buildErrorResponse("Failed to complete get accounts by holder request!", e);
        }
    }

    @GetMapping(path = "/withBalance/{equalityType}/{balance}")
    public ResponseEntity<AccountResponse> getAccountWithBalance(@PathVariable(value = "equalityType") EqualityType equalityType,
                                                                 @PathVariable(value = "balance") double balance) {
        try {
            List<BankAccount> accounts = queryDispatcher.send(new FindAccountsWithBalanceQuery(equalityType, balance));
            return buildAccountsResponseEntity(accounts);
        } catch (Exception e) {
            return buildErrorResponse("Failed to complete get accounts with balance request!", e);
        }
    }

    private ResponseEntity<AccountResponse> buildAccountsResponseEntity(List<BankAccount> accounts) {
        if (accounts == null || accounts.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        var response = AccountResponse.builder()
                .accounts(accounts)
                .message(String.format(
                        accounts.size() > 1 ?
                                "Successfully returned bank {0} accounts!" :
                                "Successfully returned bank account",
                        accounts.size()))
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private ResponseEntity<AccountResponse> buildErrorResponse(String safeMessage, Exception exception) {
        logger.log(Level.SEVERE, safeMessage, exception);
        return new ResponseEntity<>(new AccountResponse(safeMessage), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
