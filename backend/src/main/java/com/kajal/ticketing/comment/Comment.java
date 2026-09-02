package com.kajal.ticketing.comment;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "ticket_comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long ticketId;

    @Column(nullable = false, length = 1000)
    private String message;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() { createdAt = Instant.now(); }

    public Long getId() { return id; }
    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public Instant getCreatedAt() { return createdAt; }
}
