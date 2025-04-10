package com.edujourney.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.edujourney.backend.model.Job;
import com.edujourney.backend.repository.JobRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController

public class JobController {
    
    @Autowired
    private JobRepository jobRepository;

    @PostMapping("/api/job")
    Job newJob (@RequestBody Job newJob) {
        return jobRepository.save(newJob);
    }

    @GetMapping("/api/job")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
    
}
