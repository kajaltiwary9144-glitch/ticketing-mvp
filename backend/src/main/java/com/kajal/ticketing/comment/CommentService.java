package com.kajal.ticketing.comment;

import com.kajal.ticketing.ticket.TicketService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository repository;
    private final TicketService ticketService;

    public CommentService(CommentRepository repository, TicketService ticketService) {
        this.repository = repository;
        this.ticketService = ticketService;
    }

    public List<Comment> findForTicket(Long ticketId) {
        ticketService.findById(ticketId);
        return repository.findByTicketIdOrderByCreatedAtAsc(ticketId);
    }

    public Comment add(Long ticketId, CommentRequest request) {
        ticketService.findById(ticketId);
        Comment comment = new Comment();
        comment.setTicketId(ticketId);
        comment.setMessage(request.message().trim());
        comment.setAuthor(request.author().trim());
        return repository.save(comment);
    }
}
