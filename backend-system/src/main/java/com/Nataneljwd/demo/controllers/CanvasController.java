package com.Nataneljwd.demo.controllers;

import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Nataneljwd.demo.Models.Canvas;
import com.Nataneljwd.demo.services.CanvasService;

import jakarta.servlet.http.HttpServletRequest;

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

    @GetMapping("/{id}")
    public ResponseEntity<Canvas> getCanvas(@PathVariable String id) {
        return new ResponseEntity(canvasService.getCanvasById(id), HttpStatus.OK);
    }

    @GetMapping("/owner")
    public ResponseEntity<List<String>> getCanvasesByOwnerNameOrId(@RequestParam(required = false) String owner,
            @RequestParam(required = false) String id,
            @RequestParam(defaultValue = "0") int pageNum) {

        Pageable pageable = PageRequest.of(pageNum, 15);
        List<String> canvases;
        if (owner != null) {
            canvases = canvasService.getCanvasesByOwner(owner, pageable);
        } else if (id != null) {
            canvases = canvasService.getCanvasesByOwnerId(id, pageable);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<String>>(canvases, HttpStatus.OK);
    }

    @GetMapping("/owner/all")
    public ResponseEntity<List<String>> getAllCanvasesByOwnerNameOrId(@RequestParam(required = false) String ownerId,
            @RequestParam(required = false) String ownerName) {
        List<String> canvases;
        if (ownerId != null) {
            canvases = canvasService.getAllCanvasesByOwnerId(ownerId);
        } else if (ownerName != null) {
            canvases = canvasService.getAllCanvasesByownerName(ownerName);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<List<String>>(canvases, HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<String> saveCanvas(@RequestBody Canvas canvas, HttpServletRequest req) {
        return new ResponseEntity(canvasService.saveOrUpdateCanvas(canvas, req.getHeader("Authorization")).substring(7),
                HttpStatus.CREATED);
        // HttpStatus.CREATED);
    }

    @PutMapping("/favourite/{id}")
    public ResponseEntity<Boolean> favouriteCanvas(@PathVariable String id, HttpServletRequest req) {
        return new ResponseEntity(
                canvasService.toggleFavouriteCanvasById(id, req.getHeader("Authorization").substring(7)),
                HttpStatus.OK);
    }

    // @PutMapping()
    // @CachePut(value = "canvases", key = "#id")
    // public ResponseEntity<String> updateCanvas(@RequestBody Canvas canvas) {
    // return new ResponseEntity(canvasService.updateCanvasById(canvas.getId(),
    // canvas), HttpStatus.OK);
    // }

    @DeleteMapping("/{id}")
    @CacheEvict(value = "canvases", key = "#id")
    public ResponseEntity<String> deleteCanvas(@PathVariable String id) {
        return new ResponseEntity(canvasService.deleteCanvasById(id), HttpStatus.OK);
    }

}
