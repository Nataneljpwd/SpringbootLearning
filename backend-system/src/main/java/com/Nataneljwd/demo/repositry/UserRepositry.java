package com.Nataneljwd.demo.repositry;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.Nataneljwd.demo.security.User;

public interface UserRepositry extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query(value = "{'username': ?0}", fields = "{'canvases': 0}")
    Optional<List<String>> getCanvasesByUsername(String name, Pageable pageable);

    @Query(value = "{'_id': ?0}", fields = "{'canvases': 0}")
    Optional<List<String>> getCanvasesByUserId(String id, Pageable pageable);
}
