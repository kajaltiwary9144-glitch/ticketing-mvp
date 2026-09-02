package com.kajal.ticketing.auth;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController @RequestMapping("/api/auth")
public class AuthController {
    public record LoginRequest(@Email String email, @NotBlank String password) {}
    public record UserContext(String name, String email, String role) {}
    @PostMapping("/login")
    public UserContext login(@Valid @RequestBody LoginRequest request) {
        // AI-assisted MVP: fixed demo identity; replace with Spring Security/JWT in production.
        if (!"agent@demo.com".equalsIgnoreCase(request.email()) || !"demo123".equals(request.password()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        return new UserContext("Demo Agent", "agent@demo.com", "AGENT");
    }
}
