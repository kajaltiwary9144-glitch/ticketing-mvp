import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import { Alert,Box,Button,Card,CardContent,Container,Divider,Stack,TextField,Typography } from '@mui/material';

export default function Login() {
  const dispatch=useDispatch();
  const {loading,error}=useSelector(state=>state.auth);
  const [form,setForm]=useState({email:'agent@demo.com',password:'demo123'});
  return <Box sx={{minHeight:'100vh',display:'grid',placeItems:'center',background:'linear-gradient(135deg,#0E2639 0%,#173B57 55%,#23536F 100%)',px:2}}><Container maxWidth="xs"><Card sx={{width:'100%',boxShadow:'0 24px 70px rgba(4,19,30,.28)'}}><CardContent sx={{p:{xs:3,sm:4}}}><Stack direction="row" alignItems="center" spacing={1.25} sx={{mb:4}}><Box sx={{width:40,height:40,borderRadius:1,bgcolor:'secondary.main',color:'white',display:'grid',placeItems:'center'}}><ConfirmationNumberOutlined/></Box><Box><Typography variant="h6">Resolve Desk</Typography><Typography variant="caption" color="text.secondary">Service operations platform</Typography></Box></Stack><Typography variant="h4" fontSize={28}>Welcome back</Typography><Typography color="text.secondary" sx={{mt:1,mb:3}}>Sign in to manage and resolve support requests.</Typography><Stack component="form" spacing={2} onSubmit={event=>{event.preventDefault();dispatch(login(form))}}>{error&&<Alert severity="error">{error}</Alert>}<TextField label="Work email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/><TextField label="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/><Button type="submit" variant="contained" size="large" disabled={loading}>{loading?'Signing in…':'Sign in'}</Button></Stack><Divider sx={{my:3}}/><Typography variant="caption" color="text.secondary">Assessment demo credentials</Typography><Typography variant="body2" sx={{mt:.5}}>agent@demo.com &nbsp;·&nbsp; demo123</Typography></CardContent></Card></Container></Box>;
}
