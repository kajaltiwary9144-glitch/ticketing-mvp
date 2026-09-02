package com.kajal.ticketing.comment;

import com.kajal.ticketing.ticket.TicketService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class CommentServiceTest {
    @Mock CommentRepository repository;
    @Mock TicketService ticketService;
    @InjectMocks CommentService service;

    @Test
    void validatesTicketBeforeAddingComment() {
        when(repository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        Comment result = service.add(7L, new CommentRequest(" Investigating ", " Demo Agent "));
        verify(ticketService).findById(7L);
        assertEquals("Investigating", result.getMessage());
        assertEquals("Demo Agent", result.getAuthor());
    }
}
