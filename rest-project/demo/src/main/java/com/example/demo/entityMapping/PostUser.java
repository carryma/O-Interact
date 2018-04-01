package com.example.demo.entityMapping;

public class PostUser {
    private String name;
    private  String label;

    public PostUser() {
    }

    public PostUser(String name, String label) {
        this.name = name;
        this.label = label;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
