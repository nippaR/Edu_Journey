package com.edujourney.backend.repository;

import com.edujourney.backend.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    // Fetch only for the logged-in user
    List<Notification> findByUserEmail(String userEmail);
}
