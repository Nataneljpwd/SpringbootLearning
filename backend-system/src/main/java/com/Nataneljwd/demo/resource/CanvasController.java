package com.Nataneljwd.demo.resource;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Nataneljwd.demo.Models.Canvas;
import com.Nataneljwd.demo.repositry.CanvasRepo;

@RestController
public class CanvasController {

    @Autowired
    private CanvasRepo repo;

    @PostMapping("/saveCanvas")
    public ResponseEntity<Canvas> saveCanvas(@RequestBody Canvas canvas){
        try{
            repo.save(canvas);
            return new ResponseEntity<Canvas>(canvas,HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getCanvas/{id}")
    public ResponseEntity<Canvas> getCanvas(@PathVariable int id){
        try{
            Optional<Canvas> canvas=repo.findById(id);
            if(canvas.isPresent()){
                return new ResponseEntity<>(canvas.get(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/deleteCanvas/{id}")
    public String deleteCanvas(@PathVariable int id){
        repo.deleteById(id);
        return "Deleted successfully" +id;
    }

    @PutMapping("updateCanvas/{id}")
    public ResponseEntity<Canvas> updateCanvas(@PathVariable int id, @RequestBody Canvas canvas){
        Optional<Canvas> _canvas = repo.findById(id);

        if(_canvas.isPresent()){
            _canvas.get().setDrawings(canvas.getDrawings());
            return new ResponseEntity<>(repo.save(canvas),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
