import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, messageFrom } from '../api';

export const login = createAsyncThunk('auth/login', async (credentials,{rejectWithValue}) => {
  try { return (await api.post('/auth/login',credentials)).data; } catch(e) { return rejectWithValue(messageFrom(e)); }
});
const saved = JSON.parse(sessionStorage.getItem('ticket-user') || 'null');
const slice=createSlice({name:'auth',initialState:{user:saved,loading:false,error:null},reducers:{logout(s){s.user=null;sessionStorage.removeItem('ticket-user');}},extraReducers:b=>b
  .addCase(login.pending,s=>{s.loading=true;s.error=null})
  .addCase(login.fulfilled,(s,a)=>{s.loading=false;s.user=a.payload;sessionStorage.setItem('ticket-user',JSON.stringify(a.payload))})
  .addCase(login.rejected,(s,a)=>{s.loading=false;s.error=a.payload})});
export const {logout}=slice.actions; export default slice.reducer;
