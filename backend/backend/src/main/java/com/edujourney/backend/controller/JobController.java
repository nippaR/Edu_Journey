package com.edujourney.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.edujourney.backend.model.Job;
import com.edujourney.backend.repository.JobRepository;
import com.edujourney.backend.model.Notification;                  // ← added
import com.edujourney.backend.repository.NotificationRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import org.springframework.http.HttpStatus;





@RestController

public class JobController {
    
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    //@PostMapping("/api/job")
    //Job newJob (@RequestBody Job newJob) {
    //    return jobRepository.save(newJob);
   // }
    @PostMapping("/api/job")
    public ResponseEntity<Job> newJob(
        @RequestBody Job newJob,
        Principal principal
    ) {
        // 1) Save the job
        Job saved = jobRepository.save(newJob);

        
        String userEmail = principal.getName();
        String msg = "New job posted: \"" + saved.getTitle() + "\"";
        Notification note = new Notification(userEmail, msg);
        notificationRepository.save(note);

       // 3) Return 201 Created
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
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