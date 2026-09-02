import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addComment,clearComments,fetchComments } from '../features/ticketsSlice';
import { Avatar,Box,Button,Chip,CircularProgress,Dialog,DialogContent,DialogTitle,Divider,IconButton,Stack,TextField,Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { statusLabel } from '../utils/tickets';

const priorityColor={HIGH:'error',MEDIUM:'warning',LOW:'success'};

export default function TicketDetails({ticket,user,onClose}) {
  const dispatch=useDispatch();
  const {comments,commentsLoading}=useSelector(state=>state.tickets);
  const [message,setMessage]=useState('');

  useEffect(()=>{
    if(ticket) dispatch(fetchComments(ticket.id));
    return ()=>dispatch(clearComments());
  },[ticket,dispatch]);

  if(!ticket) return null;

  const submit=async event=>{
    event.preventDefault();
    if(!message.trim()) return;
    const result=await dispatch(addComment({ticketId:ticket.id,message,author:user.name}));
    if(!result.error) setMessage('');
  };

  return <Dialog open={Boolean(ticket)} onClose={onClose} fullWidth maxWidth="md">
    <DialogTitle sx={{display:'flex',alignItems:'center',justifyContent:'space-between',pb:1}}>
      <Box><Typography variant="overline" color="text.secondary">Ticket #{ticket.id}</Typography><Typography variant="h5" fontWeight={700}>{ticket.title}</Typography></Box>
      <IconButton onClick={onClose} aria-label="close"><Close/></IconButton>
    </DialogTitle>
    <DialogContent>
      <Stack direction="row" spacing={1} sx={{mb:3}}><Chip label={statusLabel(ticket.status)} variant="outlined"/><Chip label={`${ticket.priority} priority`} color={priorityColor[ticket.priority]} variant="outlined"/></Stack>
      <Typography variant="subtitle2" color="text.secondary">Description</Typography>
      <Typography sx={{mt:1,mb:3,whiteSpace:'pre-wrap'}}>{ticket.description}</Typography>
      <Divider/><Typography variant="h6" sx={{mt:3,mb:2}}>Activity</Typography>
      {commentsLoading?<CircularProgress size={24}/>:comments.length?<Stack spacing={2}>{comments.map(comment=><Stack key={comment.id} direction="row" spacing={1.5}><Avatar sx={{width:32,height:32,bgcolor:'primary.light',color:'primary.main',fontSize:14}}>{comment.author[0]}</Avatar><Box sx={{flex:1,bgcolor:'background.default',p:1.5,borderRadius:1}}><Stack direction="row" justifyContent="space-between"><Typography variant="subtitle2">{comment.author}</Typography><Typography variant="caption" color="text.secondary">{new Date(comment.createdAt).toLocaleString()}</Typography></Stack><Typography variant="body2" sx={{mt:.5}}>{comment.message}</Typography></Box></Stack>)}</Stack>:<Typography color="text.secondary" sx={{mb:2}}>No comments yet. Add the first update.</Typography>}
      <Stack component="form" direction={{xs:'column',sm:'row'}} spacing={1.5} onSubmit={submit} sx={{mt:3}}><TextField fullWidth size="small" label="Add an internal comment" value={message} onChange={e=>setMessage(e.target.value)} inputProps={{maxLength:1000}}/><Button type="submit" variant="contained" disabled={!message.trim()}>Add comment</Button></Stack>
    </DialogContent>
  </Dialog>;
}
