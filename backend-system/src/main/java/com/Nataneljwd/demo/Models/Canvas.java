package com.Nataneljwd.demo.Models;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "canvases")
@AllArgsConstructor
@NoArgsConstructor
public class Canvas {
    @Id
    @Getter
    @Setter
    private String id;

    @Getter
    @Setter
    private List<Drawing> drawings;

    @Getter
    @Setter
    private String owner;

    @Getter
    @Setter
    private Integer ownerId;

    public String toString() {
        StringBuilder bldr = new StringBuilder();
        bldr.append("id:" + id + "\n");
        bldr.append("owner:" + owner + "\n");
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
