package com.kajal.ticketing.ticket;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "tickets")
public class Ticket {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 120)
    private String title;
    @Column(nullable = false, length = 2000)
    private String description;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private TicketStatus status;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private Priority priority;
    @Column(nullable = false, updatable = false)
    private Instant createdAt;
    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist void onCreate() { createdAt = updatedAt = Instant.now(); }
    @PreUpdate void onUpdate() { updatedAt = Instant.now(); }
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getTitle(){return title;} public void setTitle(String title){this.title=title;}
    public String getDescription(){return description;} public void setDescription(String description){this.description=description;}
    public TicketStatus getStatus(){return status;} public void setStatus(TicketStatus status){this.status=status;}
    public Priority getPriority(){return priority;} public void setPriority(Priority priority){this.priority=priority;}
    public Instant getCreatedAt(){return createdAt;} public Instant getUpdatedAt(){return updatedAt;}
}
