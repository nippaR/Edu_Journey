package com.edujourney.backend.controller;

import com.edujourney.backend.model.User;
import com.edujourney.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint to get the current user's profile (using email as identifier)
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            System.out.println("Found user: " + userOpt.get());
            return ResponseEntity.ok(userOpt.get());
        } else {
            System.out.println("User not found for email: " + email);
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to update the user profile
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        Optional<User> userOpt = userRepository.findByEmail(updatedUser.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setUsername(updatedUser.getUsername());
            // For password, consider hashing before updating if needed
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(updatedUser.getPassword());
            }
            user.setProfilePicture(updatedUser.getProfilePicture());
            userRepository.save(user);
            System.out.println("Updated user: " + user);
            return ResponseEntity.ok(user);
        }
        System.out.println("User not found for update: " + updatedUser.getEmail());
        return ResponseEntity.notFound().build();
    }

    // Endpoint to upload a profile picture
    @PostMapping("/profile/picture")
    public ResponseEntity<?> uploadProfilePicture(
            @RequestParam("email") String email,
            @RequestParam("file") MultipartFile file
    ) {
        // Find the user by email
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            System.out.println("User not found for picture upload: " + email);
            return ResponseEntity.notFound().build();
        }
        
        try {
            // Convert file to bytes and encode to Base64 string
            byte[] fileBytes = file.getBytes();
            String base64Image = Base64.getEncoder().encodeToString(fileBytes);
            
            // Update the user's profile picture
            User user = userOpt.get();
            user.setProfilePicture(base64Image);
            userRepository.save(user);
            System.out.println("Updated profile picture for user: " + email);
            return ResponseEntity.ok("Profile picture uploaded successfully.");
        } catch (IOException e) {
            System.out.println("Error uploading picture for user " + email + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to upload profile picture: " + e.getMessage());
        }
    }
}
