package com.Nataneljwd.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.Nataneljwd.demo.Exceptions.NotFoundException;
import com.Nataneljwd.demo.Exceptions.UnauthorizedException;
import com.Nataneljwd.demo.Models.Canvas;
import com.Nataneljwd.demo.repositry.CanvasRepositry;
import com.Nataneljwd.demo.repositry.UserRepositry;
import com.Nataneljwd.demo.security.User;

@Service
public class CanvasService {

    private final CanvasRepositry canvasRepository;
    private final UserRepositry userRepositry;
    private final JwtService jwtService;

    public CanvasService(CanvasRepositry canvasRepository, UserRepositry userRepositry, JwtService jwtService) {
        this.canvasRepository = canvasRepository;
        this.userRepositry = userRepositry;
        this.jwtService = jwtService;
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
        String st = canvas.getId();
        String email = jwtService.extractUsername(canvas.getOwnerId());
        User user = userRepositry.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Owner does not exist"));
        canvas.setOwnerId(user.getId());
        user.getCanvases().add(canvas.getId());
        canvasRepository.save(canvas);
        userRepositry.save(user);
        return st;
    }

    public String deleteCanvasById(String id) {
        if (canvasRepository.existsById(id)) {
            User user = userRepositry.findById(canvasRepository.findById(id).get().getOwnerId())
                    .orElseThrow(() -> new NotFoundException("Owner does not exist"));
            if (user.getCanvases().contains(id)) {
                canvasRepository.deleteById(id);
            } else {
                throw new UnauthorizedException("This is not your canvas");
            }
        } else {
            throw new NotFoundException("Canvas does not exist");
        }
        return id;
    }

    public Canvas getCanvasById(String id) {
        Canvas c = canvasRepository.findById(id).orElseThrow(() -> new NotFoundException("Canvas not found"));
        return c;
    }

    public List<String> getCanvasesByOwner(String owner, Pageable pageable) {
        List<String> lst = userRepositry.getCanvasesByUsername(owner, pageable)
                .orElseThrow(() -> new NotFoundException("Owner does not exist or has no canvases"));
        return lst;
    }

    public List<String> getCanvases(Pageable pageable) {
        List<String> lst = canvasRepository.findAll(pageable).getContent().stream().map(canvas -> canvas.getId())
                .collect(Collectors.toList());
        return lst;
    }

    public List<String> getAllCanvasesByOwnerId(String id) {
        List<String> lst = userRepositry.getCanvasesByUserId(id)
                .orElseThrow(() -> new NotFoundException("Owner does not exist or has no canvases"));
        return lst;
    }

    public List<String> getCanvasesByOwnerId(String id, Pageable pageable) {
        List<String> lst = userRepositry.getCanvasesByUserId(id, pageable)
                .orElseThrow(() -> new NotFoundException("Owner does not exist or has no canvases"));
        return lst;
    }

    public List<String> getAllCanvasesByownerName(String owner) {
        List<String> lst = userRepositry.getCanvasesByUsername(owner)
                .orElseThrow(() -> new NotFoundException("Owner does not exist or has no canvases"));
        return lst;
    }
}
