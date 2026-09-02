import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { Alert,Box,Button,Card,CardContent,Container,Stack,TextField,Typography } from '@mui/material';

export default function Login(){
 const dispatch=useDispatch(),{loading,error}=useSelector(s=>s.auth);
 const [form,setForm]=useState({email:'agent@demo.com',password:'demo123'});
 return <Container maxWidth="xs"><Box sx={{minHeight:'100vh',display:'grid',placeItems:'center'}}><Card sx={{width:'100%',boxShadow:4}}><CardContent sx={{p:4}}>
  <Typography variant="h4" fontWeight={800}>HelpDesk</Typography><Typography color="text.secondary" sx={{mb:3}}>Sign in to manage customer tickets</Typography>
  <Stack component="form" spacing={2} onSubmit={e=>{e.preventDefault();dispatch(login(form))}}>{error&&<Alert severity="error">{error}</Alert>}
   <TextField label="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
   <TextField label="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
   <Button type="submit" variant="contained" size="large" disabled={loading}>{loading?'Signing in…':'Sign in'}</Button>
   <Typography variant="caption" color="text.secondary">Demo: agent@demo.com / demo123</Typography>
  </Stack></CardContent></Card></Box></Container>;
}
