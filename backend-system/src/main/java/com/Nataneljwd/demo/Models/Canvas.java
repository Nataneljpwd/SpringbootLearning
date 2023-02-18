package com.Nataneljwd.demo.Models;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class Canvas {

    private Drawing[] drawings;
    public Canvas(Drawing[] d){
        this.drawings=d;
    }

	public Drawing[] getDrawings() {
		return this.drawings;
	}

	public void setDrawings(Drawing[] drawings) {
        this.drawings=drawings;
	}
    public String toString(){
        StringBuilder bldr=new StringBuilder();
        for(Drawing d:this.drawings){
            bldr.append(d.toString());
            bldr.append("\n");
        }
        return bldr.toString();
    }
    
}
