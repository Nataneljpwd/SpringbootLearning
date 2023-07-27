package com.Nataneljwd.demo.Models;

import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonDeserialize(using = com.Nataneljwd.demo.deserializers.DrawingDeserializer.class)
public class Drawing {

    private Pixel[] pixels;

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class Pixel {

        private String color = "";

        private int[] pos;

        public String toString() {
            return String.format("{pos: [%d, %d], color: %s}", pos[0], pos[1], color);
        }
    }

    public String toString() {
        StringBuilder bldr = new StringBuilder();

        bldr.append("[");
        for (Pixel p : pixels) {
            bldr.append(p.toString());
            bldr.append(", ");
        }
        bldr.append("]");
        return bldr.substring(0, bldr.length() - 2);
    }
}
