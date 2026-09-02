import { useMemo,useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from './features/authSlice';
import { fetchTickets,removeTicket } from './features/ticketsSlice';
import { filterTickets,sortTickets,statusLabel } from './utils/tickets';
import Login from './components/Login';
import TicketForm from './components/TicketForm';
import TicketDetails from './components/TicketDetails';
import TicketCard from './components/TicketCard';
import Add from '@mui/icons-material/Add';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import PendingActionsOutlined from '@mui/icons-material/PendingActionsOutlined';
import TaskAltOutlined from '@mui/icons-material/TaskAltOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Alert,AppBar,Avatar,Box,Button,Card,CardContent,Chip,CircularProgress,Container,Grid,IconButton,MenuItem,Paper,Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField,Toolbar,Tooltip,Typography,useMediaQuery,useTheme } from '@mui/material';

const priorityColor={HIGH:'error',MEDIUM:'warning',LOW:'success'};

function Metric({label,value,icon,color}) {
  return <Card variant="outlined"><CardContent sx={{display:'flex',alignItems:'center',gap:2,p:'18px !important'}}><Box sx={{display:'grid',placeItems:'center',width:42,height:42,borderRadius:1.5,bgcolor:color,color:'primary.main'}}>{icon}</Box><Box><Typography variant="h5" fontWeight={750}>{value}</Typography><Typography variant="body2" color="text.secondary">{label}</Typography></Box></CardContent></Card>;
}

export default function App() {
  const dispatch=useDispatch();
  const theme=useTheme();
  const mobile=useMediaQuery(theme.breakpoints.down('sm'));
  const user=useSelector(state=>state.auth.user);
  const {items,loading,error}=useSelector(state=>state.tickets);
  const [formOpen,setFormOpen]=useState(false);
  const [editing,setEditing]=useState(null);
  const [details,setDetails]=useState(null);
  const [search,setSearch]=useState('');
  const [status,setStatus]=useState('ALL');
  const [priority,setPriority]=useState('ALL');
  const [sort,setSort]=useState('UPDATED');

  useEffect(()=>{ if(user) dispatch(fetchTickets()); },[user,dispatch]);

  // AI-assisted filter/sort implementation, manually reviewed for immutable sorting.
  const shown=useMemo(()=>{
    const filtered=filterTickets(items,search,status).filter(ticket=>priority==='ALL'||ticket.priority===priority);
    return sortTickets(filtered,sort);
  },[items,search,status,priority,sort]);

  if(!user) return <Login/>;

  const openEdit=ticket=>{ setEditing(ticket); setFormOpen(true); };
  const deleteTicket=id=>window.confirm('Delete this ticket permanently?')&&dispatch(removeTicket(id));
  const counts={open:items.filter(t=>t.status!=='DONE').length,progress:items.filter(t=>t.status==='IN_PROGRESS').length,done:items.filter(t=>t.status==='DONE').length};

  return <Box sx={{minHeight:'100vh'}}>
    <AppBar position="sticky" elevation={0} sx={{bgcolor:'#102A40',borderBottom:'1px solid rgba(255,255,255,.08)'}}><Toolbar sx={{minHeight:'68px !important'}}><Stack direction="row" alignItems="center" spacing={1.25} sx={{flexGrow:1}}><Box sx={{width:34,height:34,borderRadius:1,bgcolor:'secondary.main',display:'grid',placeItems:'center'}}><ConfirmationNumberOutlined/></Box><Box><Typography fontWeight={750} lineHeight={1.1}>Resolve Desk</Typography><Typography variant="caption" sx={{color:'rgba(255,255,255,.62)'}}>Service operations</Typography></Box></Stack><Stack direction="row" alignItems="center" spacing={1}><Avatar sx={{width:34,height:34,bgcolor:'#DCEAF1',color:'#173B57',fontSize:14}}>{user.name[0]}</Avatar>{!mobile&&<Box><Typography variant="body2" fontWeight={650}>{user.name}</Typography><Typography variant="caption" sx={{color:'rgba(255,255,255,.62)'}}>{user.role}</Typography></Box>}<Tooltip title="Sign out"><IconButton color="inherit" onClick={()=>dispatch(logout())}><LogoutOutlined fontSize="small"/></IconButton></Tooltip></Stack></Toolbar></AppBar>

    <Container maxWidth="xl" sx={{py:{xs:3,md:4}}}>
      <Stack direction={{xs:'column',sm:'row'}} justifyContent="space-between" alignItems={{sm:'center'}} gap={2} sx={{mb:3}}><Box><Typography variant="h4">Ticket workspace</Typography><Typography color="text.secondary" sx={{mt:.5}}>Review, prioritize and resolve service requests.</Typography></Box><Button variant="contained" startIcon={<Add/>} onClick={()=>{setEditing(null);setFormOpen(true)}} sx={{alignSelf:{xs:'stretch',sm:'center'},px:2.5}}>Create ticket</Button></Stack>
      <Grid container spacing={2} sx={{mb:3}}><Grid size={{xs:12,sm:4}}><Metric label="Open tickets" value={counts.open} icon={<ConfirmationNumberOutlined/>} color="#E8F0F5"/></Grid><Grid size={{xs:12,sm:4}}><Metric label="In progress" value={counts.progress} icon={<PendingActionsOutlined/>} color="#FFF4DC"/></Grid><Grid size={{xs:12,sm:4}}><Metric label="Resolved" value={counts.done} icon={<TaskAltOutlined/>} color="#E7F4EF"/></Grid></Grid>
      {error&&<Alert severity="error" sx={{mb:2}}>{error}</Alert>}
      <Paper variant="outlined" sx={{p:2,mb:2}}><Stack direction={{xs:'column',md:'row'}} spacing={1.5}><TextField fullWidth size="small" label="Search by title" value={search} onChange={e=>setSearch(e.target.value)}/><TextField size="small" select label="Status" value={status} onChange={e=>setStatus(e.target.value)} sx={{minWidth:165}}>{['ALL','NEW','IN_PROGRESS','DONE'].map(value=><MenuItem key={value} value={value}>{statusLabel(value)}</MenuItem>)}</TextField><TextField size="small" select label="Priority" value={priority} onChange={e=>setPriority(e.target.value)} sx={{minWidth:150}}>{['ALL','HIGH','MEDIUM','LOW'].map(value=><MenuItem key={value} value={value}>{value}</MenuItem>)}</TextField><TextField size="small" select label="Sort by" value={sort} onChange={e=>setSort(e.target.value)} sx={{minWidth:160}}><MenuItem value="UPDATED">Recently updated</MenuItem><MenuItem value="PRIORITY">Priority</MenuItem></TextField></Stack></Paper>
      {loading?<Box sx={{textAlign:'center',py:9}}><CircularProgress/></Box>:shown.length===0?<Paper variant="outlined" sx={{textAlign:'center',py:9}}><ConfirmationNumberOutlined sx={{fontSize:40,color:'text.disabled',mb:1}}/><Typography variant="h6">No tickets found</Typography><Typography color="text.secondary">Create a ticket or adjust your filters.</Typography></Paper>:mobile?<Stack spacing={1.5}>{shown.map(ticket=><TicketCard key={ticket.id} ticket={ticket} onView={setDetails} onEdit={openEdit} onDelete={deleteTicket}/>)}</Stack>:<TableContainer component={Paper} variant="outlined"><Table><TableHead><TableRow sx={{bgcolor:'#F8FAFB'}}><TableCell>Ticket</TableCell><TableCell>Status</TableCell><TableCell>Priority</TableCell><TableCell>Last updated</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead><TableBody>{shown.map(ticket=><TableRow key={ticket.id} hover sx={{cursor:'pointer'}} onClick={()=>setDetails(ticket)}><TableCell><Typography variant="body2" fontWeight={650}>{ticket.title}</Typography><Typography variant="caption" color="text.secondary">#{ticket.id}</Typography></TableCell><TableCell><Chip size="small" label={statusLabel(ticket.status)} variant="outlined"/></TableCell><TableCell><Chip size="small" label={ticket.priority} color={priorityColor[ticket.priority]} variant="outlined"/></TableCell><TableCell><Typography variant="body2" color="text.secondary">{new Date(ticket.updatedAt).toLocaleDateString()}</Typography></TableCell><TableCell align="right" onClick={e=>e.stopPropagation()}><Tooltip title="Edit"><IconButton size="small" onClick={()=>openEdit(ticket)}><EditOutlined fontSize="small"/></IconButton></Tooltip><Tooltip title="Delete"><IconButton size="small" color="error" onClick={()=>deleteTicket(ticket.id)}><DeleteOutline fontSize="small"/></IconButton></Tooltip></TableCell></TableRow>)}</TableBody></Table></TableContainer>}
    </Container>
    <TicketForm open={formOpen} ticket={editing} onClose={()=>setFormOpen(false)}/><TicketDetails ticket={details} user={user} onClose={()=>setDetails(null)}/>
  </Box>;
}
