package com.edujourney.backend.repository;

import com.edujourney.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
    // MongoRepository provides basic CRUD operations
}
