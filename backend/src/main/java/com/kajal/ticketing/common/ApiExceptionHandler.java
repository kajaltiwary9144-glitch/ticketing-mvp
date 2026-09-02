package com.kajal.ticketing.common;

import com.kajal.ticketing.ticket.TicketNotFoundException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(TicketNotFoundException.class)
    ResponseEntity<?> notFound(TicketNotFoundException ex) { return error(HttpStatus.NOT_FOUND, ex.getMessage()); }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<?> invalid(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream().findFirst()
            .map(e -> e.getField()+" "+e.getDefaultMessage()).orElse("Invalid request");
        return error(HttpStatus.BAD_REQUEST, message);
    }
    private ResponseEntity<?> error(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(Map.of("timestamp", Instant.now(), "status", status.value(), "message", message));
    }
}
