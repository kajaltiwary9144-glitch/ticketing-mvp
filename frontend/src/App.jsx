import { useEffect,useMemo,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from './features/authSlice'; import { fetchTickets,removeTicket } from './features/ticketsSlice';
import Login from './components/Login'; import TicketForm from './components/TicketForm'; import TicketCard from './components/TicketCard';
import { filterTickets } from './utils/tickets';
import Add from '@mui/icons-material/Add';
import { Alert,AppBar,Box,Button,Chip,CircularProgress,Container,Grid,MenuItem,Stack,TextField,Toolbar,Typography } from '@mui/material';

export default function App(){
 const dispatch=useDispatch(),user=useSelector(s=>s.auth.user),{items,loading,error}=useSelector(s=>s.tickets);
 const [dialog,setDialog]=useState(false),[editing,setEditing]=useState(null),[search,setSearch]=useState(''),[status,setStatus]=useState('ALL');
 useEffect(()=>{if(user)dispatch(fetchTickets())},[user,dispatch]);
 const shown=useMemo(()=>filterTickets(items,search,status),[items,status,search]);
 if(!user)return <Login/>;
 return <><AppBar position="static" color="inherit" elevation={0} sx={{borderBottom:1,borderColor:'divider'}}><Toolbar><Typography variant="h5" fontWeight={800} sx={{flexGrow:1}}>HelpDesk</Typography><Chip label={user.name} sx={{mr:1}}/><Button onClick={()=>dispatch(logout())}>Logout</Button></Toolbar></AppBar>
 <Container maxWidth="lg" sx={{py:{xs:3,md:5}}}><Stack direction={{xs:'column',sm:'row'}} justifyContent="space-between" gap={2} sx={{mb:3}}><Box><Typography variant="h4" fontWeight={800}>Tickets</Typography><Typography color="text.secondary">Track and resolve customer requests</Typography></Box><Button variant="contained" startIcon={<Add/>} onClick={()=>{setEditing(null);setDialog(true)}}>New ticket</Button></Stack>
 {error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}<Stack direction={{xs:'column',sm:'row'}} spacing={2} sx={{mb:3}}><TextField fullWidth size="small" label="Search tickets" value={search} onChange={e=>setSearch(e.target.value)}/><TextField size="small" select label="Status" value={status} onChange={e=>setStatus(e.target.value)} sx={{minWidth:180}}>{['ALL','NEW','IN_PROGRESS','DONE'].map(x=><MenuItem key={x} value={x}>{x.replace('_',' ')}</MenuItem>)}</TextField></Stack>
 {loading?<Box sx={{textAlign:'center',py:8}}><CircularProgress/></Box>:shown.length?<Grid container spacing={2}>{shown.map(t=><Grid key={t.id} size={{xs:12,sm:6,md:4}}><TicketCard ticket={t} onEdit={x=>{setEditing(x);setDialog(true)}} onDelete={id=>window.confirm('Delete this ticket?')&&dispatch(removeTicket(id))}/></Grid>)}</Grid>:<Box sx={{textAlign:'center',py:8}}><Typography variant="h6">No tickets found</Typography><Typography color="text.secondary">Create your first ticket or change the filters.</Typography></Box>}
 </Container><TicketForm open={dialog} ticket={editing} onClose={()=>setDialog(false)}/></>;
}
