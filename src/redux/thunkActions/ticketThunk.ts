import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { isLoading, onError, addTickets } from '../slices/ticketsSlice';

// Получаю ID
export const fetchSearchId = createAsyncThunk<void, void>('tickets/fetchSearchId', async (_, { dispatch }) => {
   try {
      const response = await axios.get('https://aviasales-test-api.kata.academy/search');
      if (response.status === 200) {
         dispatch(onError(false));
         sessionStorage.setItem('searchId', response.data.searchId);
      }
   } catch (error) {
      dispatch(onError(true));
   }
});

// Получаю массив с билетами
export const fetchTickets = createAsyncThunk<void, void>('tickets/fetchTickets', async (_, { dispatch }) => {
   try {
      dispatch(isLoading(true));
      const response = await axios.get('https://aviasales-test-api.kata.academy/tickets', {
         params: {
            searchId: sessionStorage.getItem('searchId'),
         },
      });

      if (response.status === 200) {
         dispatch(onError(false));
      }

      if (!response.data.stop) {
         dispatch(addTickets(response.data.tickets));
         await dispatch(fetchTickets());
      } else {
         dispatch(isLoading(false));
      }
   } catch (error) {
      if ((error as AxiosError).response?.status === 500) {
         await dispatch(fetchTickets());
      } else {
         dispatch(onError(true));
         dispatch(isLoading(false));
      }
   }
});
