package com.kajal.ticketing.ticket;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService service;
    public TicketController(TicketService service) { this.service = service; }
    @GetMapping public List<Ticket> list(@RequestParam(required=false) String search) { return service.findAll(search); }
    @GetMapping("/{id}") public Ticket get(@PathVariable Long id) { return service.findById(id); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public Ticket create(@Valid @RequestBody TicketRequest request) { return service.create(request); }
    @PutMapping("/{id}") public Ticket update(@PathVariable Long id, @Valid @RequestBody TicketRequest request) { return service.update(id, request); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { service.delete(id); }
}
