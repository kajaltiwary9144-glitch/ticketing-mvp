package com.kajal.ticketing.ticket;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class TicketServiceTest {
    @Mock TicketRepository repository;
    @InjectMocks TicketService service;
    TicketRequest request = new TicketRequest("Login issue", "Cannot login", TicketStatus.NEW, Priority.HIGH);

    @Test void createsTicket() {
        when(repository.save(any())).thenAnswer(i -> i.getArgument(0));
        Ticket result = service.create(request);
        assertEquals("Login issue", result.getTitle()); assertEquals(Priority.HIGH, result.getPriority());
    }
    @Test void rejectsMissingTicket() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(TicketNotFoundException.class, () -> service.findById(99L));
    }
    @Test void searchesUsingTrimmedText() {
        service.findAll(" login ");
        verify(repository).findByTitleContainingIgnoreCaseOrderByUpdatedAtDesc("login");
    }
}
