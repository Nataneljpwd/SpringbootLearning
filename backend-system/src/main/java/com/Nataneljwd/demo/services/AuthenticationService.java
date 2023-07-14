package com.Nataneljwd.demo.services;

import com.Nataneljwd.demo.repositry.UserRepositry;
import com.Nataneljwd.demo.security.*;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepositry userRepositry;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(User user) {
        user.setCanvases(new ArrayList<String>());
        user.setRole(Role.USER);
        Optional<User> check = userRepositry.findByEmail(user.getEmail());

        if (check.isPresent()) {
            throw new BadCredentialsException("Email aleady in use");
        }
        check = userRepositry.findByUsername(user.getUsername());
        if (check.isPresent()) {
            throw new BadCredentialsException("Username aleady in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepositry.save(user);
        String jwt = jwtService.generateToken(user, 1000 * 60 * 60L);
        return AuthenticationResponse.builder().token(jwt).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest req) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        User user = userRepositry.findByEmail(req.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String jwt = jwtService.generateToken(user, 1000 * 60 * 60L);
        return AuthenticationResponse.builder().token(jwt).build();

    }

    public String refresh(String oldJwt) {
        String email = jwtService.extractUsername(oldJwt);
        UserDetails user = userRepositry.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email Not Found"));
        String jwt = jwtService.generateRefreshToken(user);
        return jwt;
    }
}
