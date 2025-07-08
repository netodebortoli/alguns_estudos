package aristides.dev.service.a;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ApplicationServiceA {
    public static void main(String[] args) {
        SpringApplication.run(ApplicationServiceA.class, args);
    }
}

@RestController
@RequestMapping("/service-a")
class SimpleController {

    @GetMapping
    public String hello() {
        return "Hello, World, from Service A!";
    }
}
