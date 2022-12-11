package ru.yofik.frontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(name = "/")
@SpringBootApplication
public class FrontendApplication implements ErrorController {

    public static void main(String[] args) {
        SpringApplication.run(FrontendApplication.class, args);
    }

    @GetMapping
    public String getPage() {
        return "index.html";
    }

    @RequestMapping("/error")
    public Object error(HttpServletRequest request, HttpServletResponse response) {
        if (request.getMethod().equalsIgnoreCase(HttpMethod.GET.name())) {
            response.setStatus(HttpStatus.OK.value());
            return "forward:/index.html";
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
