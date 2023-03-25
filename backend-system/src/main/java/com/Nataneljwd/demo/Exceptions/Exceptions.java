package com.Nataneljwd.demo.Exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;


public class Exceptions{

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public static class NotFoundException extends RuntimeException{
        public NotFoundException(String err){
            super(err);
        }
    }

}
