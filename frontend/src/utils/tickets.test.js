import { describe,expect,it } from 'vitest';
import { filterTickets,sortTickets,statusLabel,validateTicket } from './tickets';

const tickets=[
 {title:'Login error',status:'NEW',description:'x',priority:'HIGH'},
 {title:'Export report',status:'DONE',description:'x',priority:'LOW'}
];

describe('ticket utilities',()=>{
 it('filters by search text and status',()=>expect(filterTickets(tickets,'login','NEW')).toHaveLength(1));
 it('formats API status values',()=>expect(statusLabel('IN_PROGRESS')).toBe('IN PROGRESS'));
 it('rejects incomplete tickets',()=>expect(validateTicket({...tickets[0],title:'  '})).toBe(false));
 it('sorts high-priority tickets first',()=>expect(sortTickets(tickets,'PRIORITY')[0].priority).toBe('HIGH'));
});
