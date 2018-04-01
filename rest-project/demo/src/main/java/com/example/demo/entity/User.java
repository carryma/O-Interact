package com.example.demo.entity;


import java.util.Date;

public class User {
    private int id;
    private String name;
    private String label;
    private Date date;

    public User() {
    }

    public User(String name, String label) {
        this.name = name;
        this.label = label;
        this.date = new Date();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Date getDate() {
        return date;
        // new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);

    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", label='" + label + '\'' +
                ", date=" + date +
                '}';
    }
}
