package com.edujourney.backend.repository;

import com.edujourney.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
    // Spring Data provides basic CRUD out of the box
}