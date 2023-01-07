package com.Nataneljwd.demo.repositry;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Nataneljwd.demo.Models.Canvas;

public interface CanvasRepo extends MongoRepository<Canvas, Integer>{
    
}
