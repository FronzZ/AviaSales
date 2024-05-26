import { configureStore } from '@reduxjs/toolkit';

import asideFiltersSlice from '../slices/asideFiltersSlice';
import ticketSorterSlice from '../slices/ticketSorterSlice';
import ticketsSlice from '../slices/ticketsSlice';

const store = configureStore({
   reducer: { asideFilters: asideFiltersSlice, ticketSorter: ticketSorterSlice, tickets: ticketsSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
