package com.kajal.ticketing.ticket;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record TicketRequest(
    @NotBlank @Size(max=120) String title,
    @NotBlank @Size(max=2000) String description,
    @NotNull TicketStatus status,
    @NotNull Priority priority
) {}
