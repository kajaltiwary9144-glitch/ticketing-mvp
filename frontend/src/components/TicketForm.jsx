import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveTicket } from '../features/ticketsSlice';
import { Button,Dialog,DialogActions,DialogContent,DialogTitle,MenuItem,Stack,TextField } from '@mui/material';
import { validateTicket } from '../utils/tickets';

const empty={title:'',description:'',status:'NEW',priority:'MEDIUM'};
export default function TicketForm({open,ticket,onClose}){
 const dispatch=useDispatch(),[form,setForm]=useState(empty),[busy,setBusy]=useState(false);
 useEffect(()=>setForm(ticket||empty),[ticket,open]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();if(!validateTicket(form))return;setBusy(true);const result=await dispatch(saveTicket(form));setBusy(false);if(!result.error)onClose();};
 return <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"><Stack component="form" onSubmit={submit}>
  <DialogTitle>{ticket?'Edit ticket':'Create ticket'}</DialogTitle><DialogContent><Stack spacing={2} sx={{pt:1}}>
   <TextField name="title" label="Title" value={form.title} onChange={change} inputProps={{maxLength:120}} required/>
   <TextField name="description" label="Description" value={form.description} onChange={change} multiline minRows={4} required/>
   <TextField name="status" label="Status" value={form.status} onChange={change} select>{['NEW','IN_PROGRESS','DONE'].map(x=><MenuItem key={x} value={x}>{x.replace('_',' ')}</MenuItem>)}</TextField>
   <TextField name="priority" label="Priority" value={form.priority} onChange={change} select>{['LOW','MEDIUM','HIGH'].map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField>
  </Stack></DialogContent><DialogActions><Button onClick={onClose}>Cancel</Button><Button type="submit" variant="contained" disabled={busy}>{busy?'Saving…':'Save ticket'}</Button></DialogActions>
 </Stack></Dialog>;
}
