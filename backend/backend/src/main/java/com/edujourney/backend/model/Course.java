package com.edujourney.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")

public class Course {
    
    private String title;
    private String description;
    private String instructor;
    private String duration;
    private String level;
    private String keywords;

    // Getters
    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getInstructor() {
        return instructor;
    }

    public String getDuration() {
        return duration;
    }

    public String getLevel() {
        return level;
    }

    public String getKeywords() {
        return keywords;
    }

    // Setters
    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

}
