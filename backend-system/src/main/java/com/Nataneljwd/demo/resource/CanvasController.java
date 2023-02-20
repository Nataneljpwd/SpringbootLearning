package com.Nataneljwd.demo.resource;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Nataneljwd.demo.Models.Canvas;
import com.Nataneljwd.demo.Models.Drawing;
import com.Nataneljwd.demo.Models.Drawing.point;
import com.Nataneljwd.demo.repositry.CanvasRepo;

@RestController
public class CanvasController {

    @Autowired
    private CanvasRepo repo;
    private Canvas canvas;

    @PostMapping("/saveCanvas")
    public ResponseEntity<Canvas> saveCanvas(@RequestBody Canvas canvas){
        this.canvas=canvas;
        try{
            // repo.save(canvas);
            return new ResponseEntity<Canvas>(canvas,HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/")
    public ResponseEntity<Canvas> test(){
        return new ResponseEntity<Canvas>(canvas,HttpStatus.OK);
    }
    @GetMapping("/test")
    public ResponseEntity<Canvas> getCanvas(){
        point p = new point("black",new int[]{200,100},5);
        Canvas c= new Canvas(new Drawing[]{new Drawing(new point[]{p})});
        return new ResponseEntity<Canvas>(c, HttpStatus.OK);
        
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
