package com.edujourney.backend.repository;

import com.edujourney.backend.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    // Fetch all notifications for the logged-in user
    List<Notification> findByUserEmail(String userEmail);

    // Count only those notifications that have read == false
    int countByUserEmailAndReadFalse(String userEmail);
}
