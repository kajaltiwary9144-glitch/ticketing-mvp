package com.kajal.ticketing.ticket;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TicketService {
    private final TicketRepository repository;
    public TicketService(TicketRepository repository) { this.repository = repository; }
    public List<Ticket> findAll(String search) {
        return search == null || search.isBlank() ? repository.findAllByOrderByUpdatedAtDesc()
            : repository.findByTitleContainingIgnoreCaseOrderByUpdatedAtDesc(search.trim());
    }
    public Ticket findById(Long id) { return repository.findById(id).orElseThrow(() -> new TicketNotFoundException(id)); }
    public Ticket create(TicketRequest request) { return repository.save(copy(new Ticket(), request)); }
    public Ticket update(Long id, TicketRequest request) { return repository.save(copy(findById(id), request)); }
    public void delete(Long id) { repository.delete(findById(id)); }
    private Ticket copy(Ticket ticket, TicketRequest request) {
        ticket.setTitle(request.title().trim()); ticket.setDescription(request.description().trim());
        ticket.setStatus(request.status()); ticket.setPriority(request.priority()); return ticket;
    }
}
