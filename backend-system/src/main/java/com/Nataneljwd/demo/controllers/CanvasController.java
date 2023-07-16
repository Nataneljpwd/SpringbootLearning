package com.Nataneljwd.demo.controllers;

import java.util.List;

import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Nataneljwd.demo.Models.Canvas;
import com.Nataneljwd.demo.services.AuthenticationService;
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
    public ResponseEntity<String> saveCanvas(@RequestBody Canvas canvas) {
        return new ResponseEntity(canvasService.saveCanvas(canvas), HttpStatus.CREATED);
        // HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateCanvas(@RequestBody Canvas canvas) {
        return new ResponseEntity(canvasService.updateCanvasById(canvas.getId(), canvas), HttpStatus.OK);
    }

}
