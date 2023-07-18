package com.Nataneljwd.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.cache.annotation.EnableCaching;
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

    public Canvas updateCanvasById(Canvas canvas, String jwt) {
        String id = canvas.getId();
        Canvas c = canvasRepository.findById(id).orElseThrow(() -> new NotFoundException("Canvas not found"));
        if (canvas.getOwnerId() != null) {
            User user = userRepositry.findById(jwtService.extractUsername(jwt))
                    .orElseThrow(() -> new NotFoundException("Owner does not exist"));
            if (user.getCanvases().contains(id)) {
                c.setOwnerId(user.getId());
                canvasRepository.save(c);
                user.getCanvases().add(c.getId());
                userRepositry.save(user);
            } else {
                // this is a remix of a canvas
                canvas.getRemixes().add(user.getId());
                canvasRepository.save(c);
                canvas.setId(null);
                canvas.setOwnerId(user.getId());
                canvasRepository.save(canvas);
            }
        } else {
            // canvas request is invalid
            throw new BadCredentialsException("Invalid Request Data");
        }
        c.setDrawings(canvas.getDrawings());
        canvasRepository.save(c);
        return c;
    }

    public String saveOrUpdateCanvas(Canvas canvas, String jwt) {
        if (canvasRepository.findById(canvas.getId()).isPresent()) {
            return updateCanvasById(canvas, jwt).getId();
        }
        return saveCanvas(canvas).getId();
    }

    /**
     * @return a boolean saying whether the canvas is favoured by us or no
     */
    public boolean toggleFavouriteCanvasById(String id, String jwt) {
        Canvas c = canvasRepository.findById(id).orElseThrow(() -> new NotFoundException("Canvas not found"));
        User user = userRepositry.findById(jwtService.extractUsername(jwt))
                .orElseThrow(() -> new NotFoundException("Owner does not exist"));
        if (!user.getFavourites().contains(id)) {
            user.getFavourites().add(id);
            c.getFavourites().add(user.getId());
            canvasRepository.save(c);
            userRepositry.save(user);
            return true;
        } else {
            user.getFavourites().remove(id);
            c.getFavourites().remove(user.getId());
            canvasRepository.save(c);
            userRepositry.save(user);
            return false;
        }
    }

    public Canvas saveCanvas(Canvas canvas) {
        String st = canvas.getId();
        String email = jwtService.extractUsername(canvas.getOwnerId());
        User user = userRepositry.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Owner does not exist"));
        canvas.setOwnerId(user.getId());
        user.getCanvases().add(canvas.getId());
        canvas.setFavourites(new ArrayList<String>());
        canvas.setRemixes(new ArrayList<String>());
        canvasRepository.save(canvas);
        userRepositry.save(user);
        return canvas;
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
