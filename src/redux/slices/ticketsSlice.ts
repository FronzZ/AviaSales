import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITicket, IFetchTicketsState } from '../../Interfaces/tickets';

const initialState: IFetchTicketsState = {
   tickets: [],
   showMoreCount: 5,
   isLoading: false,
   onError: false,
};

const ticketsSlice = createSlice({
   name: 'tickets',
   initialState,
   reducers: {
      addTickets(state, action: PayloadAction<ITicket[]>) {
         return { ...state, tickets: [...state.tickets, ...action.payload] };
      },
      isLoading(state, action: PayloadAction<boolean>) {
         return { ...state, isLoading: action.payload };
      },
      onError(state, action: PayloadAction<boolean>) {
         return { ...state, onError: action.payload };
      },
      incrementShowMoreCount(state) {
         return { ...state, showMoreCount: state.showMoreCount + 5 };
      },
   },
});

export const { addTickets, isLoading, onError, incrementShowMoreCount } = ticketsSlice.actions;

export default ticketsSlice.reducer;
