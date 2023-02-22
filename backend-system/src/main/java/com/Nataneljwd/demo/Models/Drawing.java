package com.Nataneljwd.demo.Models;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Drawing {

    private point[] points;

    public Drawing(point[] points) {
        this.points=points;
    }
    public Drawing(){}


    public static class point{

        private String color="";
        private int[] pos;
        private int radius;

        public point(String color, int[] pos, int radius){
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

		public void setRadius(int radius) {
			this.radius = radius;
		}

    }


	public point[] getPoints() {
		return points;
	}


	public void setPoints(point[] points) {
		this.points = points;
	}
    public String toString(){
        ObjectMapper mapper=new ObjectMapper();
        try{
        return mapper.writeValueAsString(this.points);
        }catch(Exception e){
            System.out.println("errorrrrrr");
            return "failed";
        }

    }
    
}
