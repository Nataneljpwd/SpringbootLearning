package com.Nataneljwd.demo.security;

import java.util.List;

import lombok.Data;

@Data
public class UserDTO {

    private String username;
    private String id;
    private List<String> favourites;
    private List<String> canvases;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getName();
        this.favourites = user.getFavourites();
        this.canvases = user.getCanvases();
    }
}
