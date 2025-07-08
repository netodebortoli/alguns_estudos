package aristides.dev.service.b;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ApplicationServiceB {
    public static void main(String[] args) {
        SpringApplication.run(ApplicationServiceB.class, args);
    }
}

@RestController
@RequestMapping("/service-b")
class SimpleController {

    @GetMapping
    public String ola() {
        return "Hello, World, from Service B!";
    }
}
