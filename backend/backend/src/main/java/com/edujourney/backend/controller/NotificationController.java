package com.edujourney.backend.controller;

import com.edujourney.backend.model.Notification;
import com.edujourney.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    // 1. List all notifications for the logged-in user
    @GetMapping
    public List<Notification> list(Principal principal) {
        return notificationRepository.findByUserEmail(principal.getName());
    }

    // NEW: return only the count of unread notifications
    @GetMapping("/unread/count")
    public ResponseEntity<Integer> getUnreadCount(Principal principal) {
        int cnt = notificationRepository.countByUserEmailAndReadFalse(principal.getName());
        return ResponseEntity.ok(cnt);
    }

    // 2. Get one notification by ID (only if it belongs to the user)
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getOne(@PathVariable String id, Principal principal) {
        return notificationRepository.findById(id)
            .filter(n -> n.getUserEmail().equals(principal.getName()))
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // 3. Update (e.g., mark read/unread)
    @PutMapping("/{id}")
    public ResponseEntity<Notification> update(
        @PathVariable String id,
        @RequestBody Notification updated,
        Principal principal
    ) {
        return notificationRepository.findById(id)
            .filter(n -> n.getUserEmail().equals(principal.getName()))
            .map(n -> {
                n.setRead(updated.isRead());
                Notification saved = notificationRepository.save(n);
                return ResponseEntity.ok(saved);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // 4. Delete a notification
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id, Principal principal) {
        return notificationRepository.findById(id)
            .filter(n -> n.getUserEmail().equals(principal.getName()))
            .map(n -> {
                notificationRepository.delete(n);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
