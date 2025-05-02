package com.edujourney.backend.controller;

import com.edujourney.backend.model.Post;
import com.edujourney.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    // 1. Create a new post
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postRepository.save(post);
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