package com.techbank.account.cmd.api.commands;

public interface CommandHandler {
    void handle(CloseAccountCommand command);
    void handle(WithdrawFundsCommand command);
    void handle(DepositFundsCommand command);
    void handle(OpenAccountCommand command);
}
