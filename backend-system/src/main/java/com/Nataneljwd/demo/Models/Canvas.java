package com.Nataneljwd.demo.Models;


import java.util.UUID;

import org.springframework.data.annotation.Id;


public class Canvas {
    @Id
    private String id;
	private Drawing[] drawings;
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
    public Canvas(){}
    public Canvas(Drawing[] d){
        this.drawings=d;
        this.id=UUID.randomUUID().toString();
    }

	public Drawing[] getDrawings() {
		return this.drawings;
	}

	public void setDrawings(Drawing[] drawings) {
        this.drawings=drawings;
	}
    public String toString(){
        StringBuilder bldr=new StringBuilder();
        bldr.append("id:"+id+"\n");
        for(Drawing d:this.drawings){
            bldr.append(d.toString());
            bldr.append("\n");
        }
        return bldr.toString();
    }
    
}
