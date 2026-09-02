import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, messageFrom } from '../api';

const request=(type,fn)=>createAsyncThunk(type,async(arg,{rejectWithValue})=>{try{return await fn(arg)}catch(e){return rejectWithValue(messageFrom(e))}});
export const fetchTickets=request('tickets/fetch',async search=>(await api.get('/tickets',{params:{search}})).data);
export const saveTicket=request('tickets/save',async ticket=>ticket.id?(await api.put(`/tickets/${ticket.id}`,ticket)).data:(await api.post('/tickets',ticket)).data);
export const removeTicket=request('tickets/remove',async id=>{await api.delete(`/tickets/${id}`);return id});
export const fetchComments=request('tickets/fetchComments',async ticketId=>(await api.get(`/tickets/${ticketId}/comments`)).data);
export const addComment=request('tickets/addComment',async({ticketId,message,author})=>(await api.post(`/tickets/${ticketId}/comments`,{message,author})).data);
const slice=createSlice({name:'tickets',initialState:{items:[],comments:[],loading:false,commentsLoading:false,error:null},reducers:{clearError(s){s.error=null},clearComments(s){s.comments=[]}},extraReducers:b=>b
 .addCase(fetchTickets.pending,s=>{s.loading=true;s.error=null}).addCase(fetchTickets.fulfilled,(s,a)=>{s.loading=false;s.items=a.payload})
 .addCase(saveTicket.fulfilled,(s,a)=>{const i=s.items.findIndex(x=>x.id===a.payload.id);if(i>=0)s.items[i]=a.payload;else s.items.unshift(a.payload)})
 .addCase(removeTicket.fulfilled,(s,a)=>{s.items=s.items.filter(x=>x.id!==a.payload)})
 .addCase(fetchComments.pending,s=>{s.commentsLoading=true;s.comments=[]})
 .addCase(fetchComments.fulfilled,(s,a)=>{s.commentsLoading=false;s.comments=a.payload})
 .addCase(fetchComments.rejected,s=>{s.commentsLoading=false})
 .addCase(addComment.fulfilled,(s,a)=>{s.comments.push(a.payload)})
 .addMatcher(a=>a.type.startsWith('tickets/')&&a.type.endsWith('/rejected'),(s,a)=>{s.loading=false;s.error=a.payload})});
export const {clearError,clearComments}=slice.actions; export default slice.reducer;
