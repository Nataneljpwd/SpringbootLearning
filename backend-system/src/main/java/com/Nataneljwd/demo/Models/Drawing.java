package com.Nataneljwd.demo.Models;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Drawing {

    private Pixel[] points;

    public Drawing(Pixel[] points) {
        this.points=points;
    }
    public Drawing(){}


    public static class Pixel{

        private String color="";
        private int[] pos;

        public Pixel(){}

        public Pixel(String color, int[] pos){
            this.color = color;
            this.pos=pos;
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


    }


	public Pixel[] getPoints() {
		return points;
	}


	public void setPoints(Pixel[] points) {
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
