package aristides.dev.apihello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ApiHelloApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiHelloApplication.class, args);
    }
}

@RestController
@RequestMapping("/hello")
class HelloController {

    @GetMapping
    public String hello() {
        return "Hello, World!";
    }
}
