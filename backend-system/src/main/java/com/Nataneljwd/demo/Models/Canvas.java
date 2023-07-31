package com.Nataneljwd.demo.Models;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.redis.core.script.DigestUtils;

import com.Nataneljwd.demo.Models.Drawing.Pixel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.lang.Nullable;

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

    private Drawing[] drawings;

    private String ownerId;

    /**
     * @param favourites includes the id's of all the users who have favourited this
     *                   canvas
     */
    private List<String> favourites;

    /**
     * @param remixes includes the id's of all the users who have remixed this
     *                canvas
     */
    private List<String> remixes;

    private String drawingsHash;

    public String getHash() {
        return drawingsHash;
    }

    public void setHash(String drawingsHash) {
        this.drawingsHash = drawingsHash;
    }

    public String toString() {
        StringBuilder bldr = new StringBuilder();
        bldr.append("id:" + id + "\n");
        bldr.append("ownerId:" + ownerId + "\n");
        bldr.append("drawings:[\n");
        for (int i = 0; i < drawings.length; i++) {
            Drawing d = drawings[i];
            bldr.append(d.toString());
            if (i != drawings.length - 1)
                bldr.append(", ");
        }

        bldr.append("]");
        return bldr.toString();
    }

    public static String generateHash(Drawing[] drawings) {
        StringBuilder bldr = new StringBuilder();

        // we construct tha canvas which is of size 40*50 px
        String[][] canvas = new String[40][50];
        for (int i = 0; i < canvas.length; i++)
            for (int j = 0; j < canvas[0].length; j++)
                canvas[i][j] = "#000000";

        for (int i = 0; i < drawings.length; i++) {
            Pixel[] p = drawings[i].getPixels();
            if (p == null || p.length == 0)
                continue;
            for (int j = 0; j > p.length; j++) {
                int r = p[j].getPos()[0], c = p[j].getPos()[1];
                canvas[r][c] = p[j].getColor();
            }
        }
        // we constructed the canvas, now we convert to 1 single string
        for (int i = 0; i < canvas.length; i++)
            for (int j = 0; j < canvas[0].length; j++)
                bldr.append(canvas[i][j]).append(" ");

        return DigestUtils.sha1DigestAsHex(bldr.toString());
    }

}
