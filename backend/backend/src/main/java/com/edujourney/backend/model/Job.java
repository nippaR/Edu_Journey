package com.edujourney.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobs")

public class Job {
    
        private String title;
        private String description;
        private String company;
    
        // Getters
        
    
        public String getTitle() {
            return title;
        }
    
        public String getDescription() {
            return description;
        }
    
        public String getCompany() {
            return company;
        }
    
        // Setters
    
        public void setTitle(String title) {
            this.title = title;
        }
    
        public void setDescription(String description) {
            this.description = description;
        }
    
        public void setCompany(String company) {
            this.company = company;
        }
    }
