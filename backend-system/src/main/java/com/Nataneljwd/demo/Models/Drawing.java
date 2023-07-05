package com.Nataneljwd.demo.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class Drawing {

    @Getter
    @Setter
    private Pixel[] pixels;

    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pixel {

        @Getter
        @Setter
        private String color = "";
        @Getter
        @Setter
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
