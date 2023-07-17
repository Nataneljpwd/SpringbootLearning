package com.Nataneljwd.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CanvasApiBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CanvasApiBackendApplication.class, args);
    }

}
