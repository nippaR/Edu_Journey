package com.edujourney.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobs")

public class Job {

        @Id

        private String id;
        private String title;
        private String location;
        private String company;
        private String workplaceType;
        private String jobType;
        private String description;

    
        // Getters
        
        public String getId() {
            return id;
        }
    
        public String getTitle() {
            return title;
        }

        public String getLocation() {
            return location;
        }
        
        public String getCompany() {
            return company;
        }

        public String getWorkplaceType() {
            return workplaceType;
        }

        public String getJobType() {
            return jobType;
        }

        public String getDescription() {
            return description;
        }
    
        // Setters

        public void setId(String id) {
            this.id = id;
        }
    
        public void setTitle(String title) {
            this.title = title;
        }
    
        public void setLocation(String location) {
            this.location = location;
        }
        
        public void setCompany(String company) {
            this.company = company;
        }

        public void setWorkplaceType(String workplaceType) {
            this.workplaceType = workplaceType;
        }

        public void setJobType(String jobType) {
            this.jobType = jobType;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
