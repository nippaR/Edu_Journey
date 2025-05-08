package com.edujourney.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.edujourney.backend.model.Course;
import com.edujourney.backend.repository.CourseRepository;
import com.edujourney.backend.model.Notification;
import com.edujourney.backend.repository.NotificationRepository;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;


import java.security.Principal;
import org.springframework.http.HttpStatus;



@RestController
@CrossOrigin("http://localhost:3000") // Allow requests from React app
@RequestMapping("/api")

public class CourseController {
    
    @Autowired
    private CourseRepository courseRepository;
    @PostMapping("/course")
    
    Course newCourse (@RequestBody Course newCourse) {
        return courseRepository.save(newCourse);
    }

       // Auto-trigger notifications
    @Autowired
    private NotificationRepository notificationRepository;
    
   

        @PostMapping("/api/course")
    public ResponseEntity<Course> newCourse(
        @RequestBody Course newCourse,
        Principal principal                                     // ← added
    ) {
        // 1) Save the course
        Course saved = courseRepository.save(newCourse);

                // 2) Create & save a notification
        String userEmail = principal.getName();
        String msg = "New course created: \"" + saved.getTitle() + "\"";
        Notification note = new Notification(userEmail, msg);
        notificationRepository.save(note);

                // 3) Return 201 Created
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/course")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    // Get courses by id

    @GetMapping("/course/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return courseRepository.findById(id)
                .map(course -> ResponseEntity.ok(course))
                .orElse(ResponseEntity.notFound().build());
    }

    // Get courses by instructor

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
    public ResponseEntity<Void> deleteCourse(@PathVariable String id ) {
        return courseRepository.findById(id)
                .map(course -> {
                    courseRepository.delete(course);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

