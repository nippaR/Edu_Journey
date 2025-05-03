package com.edujourney.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.edujourney.backend.model.Job;
import com.edujourney.backend.repository.JobRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    
    @GetMapping("/api/job/{id}")
    public ResponseEntity<Job> getJobId(@PathVariable String id) {
        return jobRepository.findById(id)
            .map(job -> ResponseEntity.ok(job))
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/api/job/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable String id, @RequestBody Job updateJob) {
            return jobRepository.findById(id)
                .map(job -> {
                    job.setTitle(updateJob.getTitle());
                    job.setLocation(updateJob.getLocation());
                    job.setCompany(updateJob.getCompany());
                    job.setWorkplaceType(updateJob.getWorkplaceType());
                    job.setJobType(updateJob.getJobType());
                    job.setDescription(updateJob.getDescription());
                    return ResponseEntity.ok(jobRepository.save(job));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/api/job/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        return jobRepository.findById(id)
            .map(job -> {
                jobRepository.delete(job);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }

    
}