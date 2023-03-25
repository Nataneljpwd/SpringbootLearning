package com.Nataneljwd.demo.repositry;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Nataneljwd.demo.Models.Canvas;

public interface CanvasRepository extends MongoRepository<Canvas,String>{

    public Optional<Canvas> findByOwner(String ownerId);

    public Optional<Canvas> findByOwnerName(String ownerName);

    public Optional<List<Canvas>> findByName(String name);

}
