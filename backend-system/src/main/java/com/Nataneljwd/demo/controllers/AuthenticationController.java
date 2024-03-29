package com.Nataneljwd.demo.controllers;

import com.Nataneljwd.demo.security.AuthenticationRequest;
import com.Nataneljwd.demo.security.AuthenticationResponse;
import com.Nataneljwd.demo.security.JwtRefreshRequest;
import com.Nataneljwd.demo.security.RegisterRequest;
import com.Nataneljwd.demo.security.User;
import com.Nataneljwd.demo.services.AuthenticationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody User user) {
        return ResponseEntity.ok(authenticationService.register(user));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest req) {
        return ResponseEntity.ok(authenticationService.authenticate(req));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshToken(@RequestBody JwtRefreshRequest req) {
        return ResponseEntity.ok(authenticationService.refresh(req.getOldToken()));
    }
}
