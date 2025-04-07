package com.edujourney.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.edujourney.backend.model.Job;

public interface JobRepository extends MongoRepository<Job, String> {

}