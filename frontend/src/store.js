import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import ticketsReducer from './features/ticketsSlice';
export const store = configureStore({ reducer:{auth:authReducer,tickets:ticketsReducer} });
