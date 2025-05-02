package com.edujourney.backend.controller;

import com.edujourney.backend.model.Post;
import com.edujourney.backend.model.Notification;
import com.edujourney.backend.repository.PostRepository;
import com.edujourney.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal; 
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

       // Auto-trigger notifications
    @Autowired
    private NotificationRepository notificationRepository;

    // 1. Create a new post
    @PostMapping
    //public Post createPost(@RequestBody Post post) {
    //    return postRepository.save(post);
       public ResponseEntity<Post> createPost(
       @RequestBody Post post,
       Principal principal
   ) {
       // 1) Save the post
       Post savedPost = postRepository.save(post);

       // 2) Create a notification for the current user
       String userEmail = principal.getName();
       String msg = "Your new post: \"" + post.getDescription() + "\" has been created.";
      // Notification note = new Notification(userEmail, msg);
       //notificationRepository.save(note);

       Notification note = new Notification(userEmail, msg);
       Notification savedNote = notificationRepository.save(note);
       System.out.println("Saved notification id=" + savedNote.getId()
       + " message=\"" + savedNote.getMessage() + "\" for user=" + userEmail);

       return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    // 2. Read all posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // 3. Read a single post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        return postRepository.findById(id)
                .map(post -> ResponseEntity.ok(post))
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. Update an existing post
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable String id,
            @RequestBody Post updatedPost
    ) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setDescription(updatedPost.getDescription());
                    // (update other fields here if you add more)
                    Post saved = postRepository.save(post);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Delete a post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        return postRepository.findById(id)
                .map(post -> {
                    postRepository.delete(post);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}