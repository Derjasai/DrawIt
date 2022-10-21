package edu.eci.arsw.drawitapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"edu.eci.arsw"})
public class DrawitAPIApplication {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(DrawitAPIApplication.class);
        app.run(args);
    }
}
