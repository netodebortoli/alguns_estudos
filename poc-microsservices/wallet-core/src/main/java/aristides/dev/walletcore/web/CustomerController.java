package aristides.dev.walletcore.web;

import aristides.dev.walletcore.usecase.create_customer.CreateCustomerInput;
import aristides.dev.walletcore.usecase.create_customer.CreateCustomerUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping
@RestController("/api/customers")
public class CustomerController {

    private final CreateCustomerUseCase createCustomerUseCase;

    public CustomerController(CreateCustomerUseCase createCustomerUseCase) {
        this.createCustomerUseCase = createCustomerUseCase;
    }

    @PostMapping
    public ResponseEntity<String> createCustomer() {
        String name = "John Doe";
        String email = "hogn@.com";
        var output = createCustomerUseCase.execute(new CreateCustomerInput(name, email));
        return ResponseEntity.ok(output.id());
    }
}
