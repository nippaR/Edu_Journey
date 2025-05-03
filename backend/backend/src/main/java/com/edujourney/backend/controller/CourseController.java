package com.edujourney.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;


import com.edujourney.backend.model.Course;
import com.edujourney.backend.repository.CourseRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")

public class CourseController {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @PostMapping("/course")
    
    Course newCourse (@RequestBody Course newCourse) {
        return courseRepository.save(newCourse);

    }

    @GetMapping("/course")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    
    @GetMapping("/course/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return courseRepository.findById(id)
                .map(course -> ResponseEntity.ok(course))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/course/{id}")
    public String updateCourse(@PathVariable String id, @RequestBody Course updateCourse) {
        
        return courseRepository.findById(id)
                .map(course -> {
                    course.setTitle(updateCourse.getTitle());
                    course.setDescription(updateCourse.getDescription());
                    course.setInstructor(updateCourse.getInstructor());
                    course.setDuration(updateCourse.getDuration());
                    course.setLevel(updateCourse.getLevel());
                    course.setKeywords(updateCourse.getKeywords());
                    return ResponseEntity.ok(courseRepository.save(course));
                })
                .orElse(ResponseEntity.notFound().build()).toString();
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String id) {
        return courseRepository.findById(id)
                .map(course -> {
                    courseRepository.delete(course);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
