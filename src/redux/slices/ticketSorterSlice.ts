import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITabsState } from '../../Interfaces/sorter';

const initialState: ITabsState = {
   ticketSorter: [
      { label: 'САМЫЙ ДЕШЕВЫЙ', status: false },
      { label: 'САМЫЙ БЫСТРЫЙ', status: false },
      { label: 'ОПТИМАЛЬНЫЙ', status: false },
   ],
};

const ticketSorterSlice = createSlice({
   name: 'ticketSorter',
   initialState,
   reducers: {
      changeTicketSorterStatus(state, action: PayloadAction<{ labelName: string }>) {
         return {
            ...state,
            ticketSorter: [
               ...state.ticketSorter.map((tab) => ({ ...tab, status: tab.label === action.payload.labelName })),
            ],
         };
      },
   },
});

export const { changeTicketSorterStatus } = ticketSorterSlice.actions;

export default ticketSorterSlice.reducer;
