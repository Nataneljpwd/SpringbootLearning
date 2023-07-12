package com.Nataneljwd.demo.controllers;

import com.Nataneljwd.demo.security.AuthenticationRequest;
import com.Nataneljwd.demo.security.AuthenticationResponse;
import com.Nataneljwd.demo.security.RegisterRequest;
import com.Nataneljwd.demo.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest req) {
        return ResponseEntity.ok(authenticationService.register(req));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest req) {
        return ResponseEntity.ok(authenticationService.authenticate(req));
    }

}
