package com.Nataneljwd.demo.services;

import org.springframework.stereotype.Service;

import com.Nataneljwd.demo.Exceptions.NotFoundException;
import com.Nataneljwd.demo.repositry.UserRepositry;
import com.Nataneljwd.demo.security.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepositry userRepositry;

    public UserDTO getUserByName(String name) {
        return new UserDTO(
                userRepositry.findByUsername(name).orElseThrow(() -> new NotFoundException("User not found")));
    }

    public UserDTO getUserByEmail(String email) {
        return new UserDTO(
                userRepositry.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found")));
    }

}
