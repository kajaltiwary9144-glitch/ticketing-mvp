export const statusLabel = status => status.replaceAll('_', ' ');

export const filterTickets = (tickets, search, status) => tickets.filter(ticket =>
  (status === 'ALL' || ticket.status === status) &&
  (!search || ticket.title.toLowerCase().includes(search.trim().toLowerCase()))
);

export const validateTicket = ticket => Boolean(
  ticket.title?.trim() && ticket.description?.trim() && ticket.status && ticket.priority
);
