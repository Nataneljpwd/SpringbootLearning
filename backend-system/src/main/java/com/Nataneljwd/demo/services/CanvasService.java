package com.Nataneljwd.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import com.Nataneljwd.demo.Exceptions.NotFoundException;
import com.Nataneljwd.demo.Models.Canvas;
import com.Nataneljwd.demo.repositry.CanvasRepositry;
import com.Nataneljwd.demo.repositry.UserRepositry;

@Service
public class CanvasService {

    private final CanvasRepositry canvasRepository;
    private final UserRepositry userRepositry;

    public CanvasService(CanvasRepositry canvasRepository, UserRepositry userRepositry) {
        this.canvasRepository = canvasRepository;
        this.userRepositry = userRepositry;
    }

    /** 
    * @return id of the updated canvas or throw [{@link NotFoundException}]
    */
    public String updateCanvasById(String id, Canvas canvas) {
        Canvas c = canvasRepository.findById(id).orElseThrow(() -> new NotFoundException("Canvas not found"));
        c.setDrawings(canvas.getDrawings());
        canvasRepository.save(c);
        return c.getId();
    }
    public String saveCanvas(Canvas canvas) {
        return canvasRepository.save(canvas).getId();
    }
    public String deleteCanvasById(String id) {
        if(canvasRepository.existsById(id)) {
            canvasRepository.deleteById(id);
        }else {
            throw new NotFoundException("Canvas does not exist");
        }
        return id;
    }
    public Canvas getCanvasById(String id) {
        Canvas c = canvasRepository.findById(id).orElseThrow(() -> new NotFoundException("Canvas not found"));
        return c;
    }
    public List<String> getCanvasesByOwner(String owner, Pageable pageable) {
        List<String> lst = userRepositry.getCanvasesByUsername(owner, pageable).orElseThrow(() -> new NotFoundException("Owner does not exist or has no canvases"));
        return lst;
    }
    public List<String> getCanvases(Pageable pageable) {
        List<String> lst = canvasRepository.findAll(pageable).getContent().stream().map( canvas -> canvas.getId()).collect(Collectors.toList());
        return lst;
    }

	public List<String> getCanvasesByOwnerId(String id, Pageable pageable) {
        List<String> lst = userRepositry.getCanvasesByUserId(id, pageable).orElseThrow(() -> new NotFoundException("Owner does not exist or has no canvases"));
        return lst;
	}
}
