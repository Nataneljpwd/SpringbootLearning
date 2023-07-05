package com.Nataneljwd.demo.controllers;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Nataneljwd.demo.Models.Canvas;
import com.Nataneljwd.demo.services.CanvasService;

@RestController
@RequestMapping("/api/v1/canvas")
public class CanvasController {

    private final CanvasService canvasService;

    public CanvasController(CanvasService canvasService) {
        this.canvasService = canvasService;
    }

    @GetMapping
    public ResponseEntity<List<String>> getCanvases(@RequestParam(defaultValue = "0") int pageNum) {
        Pageable pageable = PageRequest.of(pageNum, 15);
        List<String> canvases = canvasService.getCanvases(pageable);
        return new ResponseEntity<List<String>>(canvases, HttpStatus.OK);
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @GetMapping("{id}")
    public ResponseEntity<Canvas> getCanvas(@PathVariable String id) {
        return new ResponseEntity(canvasService.getCanvasById(id), HttpStatus.OK);
    }

    @GetMapping("/owner/{owner}")
    public ResponseEntity<List<String>> getCanvasesByOwnerName(@PathVariable String owner,
            @RequestParam(defaultValue = "0") int pageNum) {
        Pageable pageable = PageRequest.of(pageNum, 15);
        List<String> canvases = canvasService.getCanvasesByOwner(owner, pageable);
        return new ResponseEntity<List<String>>(canvases, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> saveCanvas(Canvas canvas) {
        return new ResponseEntity(canvasService.saveCanvas(canvas), HttpStatus.CREATED);
    }

}
