package com.Nataneljwd.demo.Models;

public class Drawing {

    private point[] points;

    Drawing(point[] points) {
        this.points=points;
    }


    public class point{

        private String color="";
        private int[] pos;
        private int radius;

        point(String color, int[] pos, int radius){
            this.color=color;
            this.pos=pos;
            this.radius=radius;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public int[] getPos() {
            return pos;
        }

        public void setPos(int[] pos) {
            this.pos = pos;
        }

        public int getRadius() {
            return radius;
        }

    }
    
}
