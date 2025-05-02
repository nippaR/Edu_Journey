package com.edujourney.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;

    // Who the notification is for
    private String userEmail;

    // The message you want to display
    private String message;

    // Has the user read it?
    private boolean read = false;

    // When it was created
    private Instant timestamp = Instant.now();

    public Notification() {}

    public Notification(String userEmail, String message) {
        this.userEmail = userEmail;
        this.message = message;
    }

    // Getters & setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
