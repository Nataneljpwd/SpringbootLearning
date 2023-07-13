package com.Nataneljwd.demo.Exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class AuthHeaderMissingException extends RuntimeException {
    public AuthHeaderMissingException(String message) {
        super(message);
    }
}
