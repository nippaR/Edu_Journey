package com.edujourney.backend.repository;

import com.edujourney.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    // Returns only posts authored by the given user
    List<Post> findByAuthor(String author);
}