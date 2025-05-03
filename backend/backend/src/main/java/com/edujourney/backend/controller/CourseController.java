package com.edujourney.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;


import com.edujourney.backend.model.Course;
import com.edujourney.backend.repository.CourseRepository;
import com.edujourney.backend.model.Notification;
import com.edujourney.backend.repository.NotificationRepository;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;



@RestController
@CrossOrigin("http://localhost:3000")

public class CourseController {
    
    @Autowired
    
    private CourseRepository courseRepository;
    
    @PostMapping("/api/course")
    
    Course newCourse (@RequestBody Course newCourse) {
        return courseRepository.save(newCourse);

    }

    @GetMapping("/api/course")
    
    public List<Course> getAllCourses() {
        
        return courseRepository.findAll();
    }
    
}
