package com.techbank.account.cmd;

import com.techbank.account.cmd.api.commands.*;
import com.techbank.cqrs.core.infrastructure.CommandDispatcher;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CommandApplication {

    private final CommandDispatcher dispatcher;

    private final CommandHandler commandHandler;

    public CommandApplication(CommandDispatcher dispatcher, CommandHandler handler) {
        this.dispatcher = dispatcher;
        this.commandHandler = handler;
    }

    public static void main(String[] args) {
        SpringApplication.run(CommandApplication.class, args);
    }

    @PostConstruct
    public void registerHandlers() {
        dispatcher.registerHandler(OpenAccountCommand.class, commandHandler::handle);
        dispatcher.registerHandler(CloseAccountCommand.class, commandHandler::handle);
        dispatcher.registerHandler(DepositFundsCommand.class, commandHandler::handle);
        dispatcher.registerHandler(WithdrawFundsCommand.class, commandHandler::handle);
    }
}
