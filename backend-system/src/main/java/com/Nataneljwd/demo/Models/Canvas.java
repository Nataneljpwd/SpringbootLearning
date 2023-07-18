package com.Nataneljwd.demo.Models;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "canvases")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Canvas {
    @Id
    private String id;

    private List<Drawing> drawings;

    private String ownerId;

    /**
     * @param favourites includes the id's of all the users who have favourited this canvas
     */
    private List<String> favourites;

    /**
     * @param remixes includes the id's of all the users who have remixed this canvas
     */
    private List<String> remixes;


    public String toString() {
        StringBuilder bldr = new StringBuilder();
        bldr.append("id:" + id + "\n");
        bldr.append("ownerId:" + ownerId + "\n");
        bldr.append("drawings:[\n");
        for (int i = 0; i < drawings.size(); i++) {
            Drawing d = drawings.get(i);
            bldr.append(d.toString());
            if (i != drawings.size() - 1)
                bldr.append(", ");
        }

        bldr.append("]");
        return bldr.toString();
    }

}
