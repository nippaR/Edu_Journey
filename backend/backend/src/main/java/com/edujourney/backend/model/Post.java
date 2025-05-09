// src/main/java/com/edujourney/backend/model/Post.java
package com.edujourney.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "posts")
public class Post {
    @Id
    private String id;

    private String description;
    private String author;       // ← who posted
    private String imageUrl;     // ← where we stored the image
    private String documentUrl;  // ← and the document

    public Post() {}

    public Post(String description, String author, String imageUrl, String documentUrl) {
        this.description  = description;
        this.author       = author;
        this.imageUrl     = imageUrl;
        this.documentUrl  = documentUrl;
    }

    // ——— standard getters/setters ———

    public String getId()             { return id; }
    public void   setId(String id)    { this.id = id; }

    public String getDescription()            { return description; }
    public void   setDescription(String d)    { this.description = d; }

    public String getAuthor()                 { return author; }
    public void   setAuthor(String a)         { this.author = a; }

    public String getImageUrl()               { return imageUrl; }
    public void   setImageUrl(String url)     { this.imageUrl = url; }

    public String getDocumentUrl()            { return documentUrl; }
    public void   setDocumentUrl(String url)  { this.documentUrl = url; }
}