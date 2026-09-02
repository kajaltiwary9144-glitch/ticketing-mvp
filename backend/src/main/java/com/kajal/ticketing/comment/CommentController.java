package com.kajal.ticketing.comment;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets/{ticketId}/comments")
public class CommentController {
    private final CommentService service;

    public CommentController(CommentService service) { this.service = service; }

    @GetMapping
    public List<Comment> list(@PathVariable Long ticketId) {
        return service.findForTicket(ticketId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Comment add(@PathVariable Long ticketId, @Valid @RequestBody CommentRequest request) {
        return service.add(ticketId, request);
    }
}
