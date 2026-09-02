export const statusLabel = status => status.replaceAll('_', ' ');

export const filterTickets = (tickets, search, status) => tickets.filter(ticket =>
  (status === 'ALL' || ticket.status === status) &&
  (!search || ticket.title.toLowerCase().includes(search.trim().toLowerCase()))
);

export const validateTicket = ticket => Boolean(
  ticket.title?.trim() && ticket.description?.trim() && ticket.status && ticket.priority
);

export const sortTickets = (tickets, sortBy) => {
  const priorityRank = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  return [...tickets].sort((a, b) => sortBy === 'PRIORITY'
    ? priorityRank[b.priority] - priorityRank[a.priority]
    : new Date(b.updatedAt) - new Date(a.updatedAt));
};
