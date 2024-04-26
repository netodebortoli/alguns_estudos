package com.techbank.account.query;

import com.techbank.account.query.api.queries.*;
import com.techbank.cqrs.core.infrastructure.QueryDispatcher;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QueryApplication {

    private final QueryDispatcher dispatcher;

    private final QueryHandler queryHandler;

    public QueryApplication(QueryDispatcher dispatcher, QueryHandler queryHandler) {
        this.dispatcher = dispatcher;
        this.queryHandler = queryHandler;
    }

    public static void main(String[] args) {
        SpringApplication.run(QueryApplication.class, args);
    }

    @PostConstruct
    void registerHandlers() {
        dispatcher.registerHandler(FindAllAccountsQuery.class, queryHandler::handle);
        dispatcher.registerHandler(FindAccountByIdQuery.class, queryHandler::handle);
        dispatcher.registerHandler(FindAccountByHolderQuery.class, queryHandler::handle);
        dispatcher.registerHandler(FindAccountsWithBalanceQuery.class, queryHandler::handle);
    }
}
