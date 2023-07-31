package com.Nataneljwd.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Nataneljwd.demo.security.UserDTO;
import com.Nataneljwd.demo.services.JwtService;
import com.Nataneljwd.demo.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/{name}")
    public ResponseEntity<UserDTO> getUserByName(@PathVariable String name) {
        return new ResponseEntity<UserDTO>(userService.getUserByName(name), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<UserDTO> getUserByAuthToken(HttpServletRequest request) {
        return new ResponseEntity<UserDTO>(
                userService.getUserByEmail(
                        jwtService.extractUsername(request.getHeader("Authorization").toString().substring(7))),
                HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<List<UserDTO>>(userService.getAllUsers(), HttpStatus.OK);
    }

}
