package com.Nataneljwd.demo.repositry;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Nataneljwd.demo.security.User;

public interface UserRepositry extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

}
