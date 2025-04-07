package com.edujourney.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.edujourney.backend.model.Course;
import com.edujourney.backend.repository.CourseRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController

public class CourseController {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @PostMapping("/api/course")
    
    Course newCourse (@RequestBody Course newCourse) {
        return courseRepository.save(newCourse);

    }
    
}
