package com.Nataneljwd.demo.resource;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Nataneljwd.demo.Exceptions.Exceptions.NotFoundException;
import com.Nataneljwd.demo.Models.Canvas;
import com.Nataneljwd.demo.repositry.CanvasRepository;

@RestController
@RequestMapping("/api/v1")
public class CanvasController {

    @Autowired
    private CanvasRepository canvasRepoositry;


    @PostMapping("/saveCanvas")
    public ResponseEntity<String> saveCanvas(@RequestBody Canvas canvas){
        try {
            canvasRepoositry.save(canvas);
            return new ResponseEntity<String>(canvas.getId(),HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    // @GetMapping("/")
    // public ResponseEntity<Canvas> test(){
    //     return new ResponseEntity<Canvas>(canvas,HttpStatus.OK);
    // }
    // @GetMapping("/test")
    // public ResponseEntity<Canvas> getCanvas(){
    //     Pixel p = new Pixel("black",new int[]{200,100},5);
    //     Canvas c= new Canvas(new Drawing[]{new Drawing(new point[]{p})});
    //     return new ResponseEntity<Canvas>(c, HttpStatus.OK);
    //     
    // }

    @GetMapping("/getCanvas/{id}")
    public ResponseEntity<Canvas> getCanvas(@PathVariable String id){
        Canvas _canvas = canvasRepoositry.findById(id).orElseThrow(() -> new NotFoundException("canvas does not exist"));
        return new ResponseEntity<>(_canvas, HttpStatus.OK);
    }

    @DeleteMapping("/deleteCanvas/{id}")
    public ResponseEntity<String> deleteCanvas(@PathVariable String id){
        canvasRepoositry.deleteById(id);
        return new ResponseEntity<>(id,HttpStatus.OK);
    }

    @PutMapping("updateCanvas/{id}")
    public ResponseEntity<String> updateCanvas(@PathVariable String id, @RequestBody Canvas canvas){
        Canvas _canvas = canvasRepoositry.findById(id).orElseThrow(() -> new NotFoundException("canvas does not exist"));

        _canvas.setDrawings(canvas.getDrawings());

        canvasRepoositry.save(_canvas);

        return new ResponseEntity<>(_canvas.getId(),HttpStatus.OK);
    }

}
