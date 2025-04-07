package com.edujourney.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.edujourney.backend.model.Course;

public interface CourseRepository extends MongoRepository<Course, String> {
    
}
