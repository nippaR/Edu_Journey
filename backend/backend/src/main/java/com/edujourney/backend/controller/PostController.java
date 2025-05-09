// src/main/java/com/edujourney/backend/controller/PostController.java
package com.edujourney.backend.controller;

import com.edujourney.backend.model.Post;
import com.edujourney.backend.model.Notification;
import com.edujourney.backend.repository.PostRepository;
import com.edujourney.backend.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final Path UPLOAD_DIR = Paths.get("uploads");

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public PostController() throws Exception {
        Files.createDirectories(UPLOAD_DIR.resolve("images"));
        Files.createDirectories(UPLOAD_DIR.resolve("docs"));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> createPost(
        @RequestPart("description") String description,
        @RequestPart(value = "image", required = false) MultipartFile image,
        @RequestPart(value = "document", required = false) MultipartFile document,
        Principal principal
    ) throws Exception {
        String imageUrl = null, docUrl = null;
        if (image != null && !image.isEmpty()) {
            String ext = StringUtils.getFilenameExtension(image.getOriginalFilename());
            String filename = UUID.randomUUID() + "." + ext;
            Path target = UPLOAD_DIR.resolve("images").resolve(filename);
            Files.copy(image.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            imageUrl = "/uploads/images/" + filename;
        }
        if (document != null && !document.isEmpty()) {
            String ext = StringUtils.getFilenameExtension(document.getOriginalFilename());
            String filename = UUID.randomUUID() + "." + ext;
            Path target = UPLOAD_DIR.resolve("docs").resolve(filename);
            Files.copy(document.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            docUrl = "/uploads/docs/" + filename;
        }

        String author = principal.getName();
        Post post = new Post(description, author, imageUrl, docUrl);
        Post savedPost = postRepository.save(post);

        String postDesc = savedPost.getDescription();
        String msg = String.format("Your new post: \"%s\" has been created.", postDesc);
        Notification note = new Notification(author, msg);
        notificationRepository.save(note);

        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    /**
     * Returns only the posts created by the currently logged-in user
     */
    @GetMapping("/mine")
    public List<Post> getMyPosts(Principal principal) {
        // Log which user invoked the /mine endpoint
        System.out.println("getMyPosts called by user: " + principal.getName());
        return postRepository.findByAuthor(principal.getName());
    }

    /**
     * All-posts endpoint is now restricted; ordinary users cannot access it
     */
    @Deprecated
    @GetMapping
    public ResponseEntity<Void> getAllPosts() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

        /**
     * Returns a single post only if it belongs to the current user
     */
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id, Principal principal) {
        return postRepository.findById(id)
            .filter(post -> post.getAuthor().equals(principal.getName()))
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(
        @PathVariable String id,
        @RequestBody Post updatedPost,
        Principal principal
    ) {
        return postRepository.findById(id)
            .filter(post -> post.getAuthor().equals(principal.getName()))
            .map(post -> {
                post.setDescription(updatedPost.getDescription());
                Post saved = postRepository.save(post);
                return ResponseEntity.ok(saved);
            })
            .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id, Principal principal) {
        return postRepository.findById(id)
            .filter(post -> post.getAuthor().equals(principal.getName()))
            .map(post -> {
                postRepository.delete(post);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN).build());
    }
}