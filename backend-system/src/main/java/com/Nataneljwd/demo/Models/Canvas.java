package com.Nataneljwd.demo.Models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Document("canvas")
public class Canvas {

    @Id
    private String id;

    private List<Drawing> drawings;
    
}
