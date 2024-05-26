import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store/index';

export const selectAllTickets = (state: RootState) => state.tickets.tickets;
export const selectShowMoreCount = (state: RootState) => state.tickets.showMoreCount;
export const selectAsideFilters = (state: RootState) => state.asideFilters.filter;
export const selectTicketSorter = (state: RootState) => state.ticketSorter.ticketSorter;

export const selectActualFilters = createSelector([selectAsideFilters], (asideFilters) => {
   return asideFilters
      .flatMap((el) => el.items)
      .filter((filter) => filter.status)
      .map((label) => label.label);
});

export const selectTicketsByFilter = createSelector(
   [selectAllTickets, selectShowMoreCount, selectActualFilters, selectTicketSorter],
   (allTickets, showMoreCount, actualFilters, ticketSorter) => {
      const filteredTickets = allTickets.filter((ticket) => {
         return ticket.segments.every((item) => {
            let stopsCount;
            switch (item.stops.length) {
               case 0:
                  stopsCount = 'Без пересадок';
                  break;
               case 1:
                  stopsCount = '1 пересадка';
                  break;
               default:
                  stopsCount = `${item.stops.length} пересадки`;
            }

            return actualFilters.includes(stopsCount);
         });
      });

      let sortedTickets;
      const actualTab = ticketSorter.find((el) => el.status)?.label;
      switch (actualTab) {
         case 'САМЫЙ ДЕШЕВЫЙ':
            sortedTickets = filteredTickets.sort((a, b) => a.price - b.price);
            break;
         case 'САМЫЙ БЫСТРЫЙ':
            sortedTickets = filteredTickets.sort((a, b) => {
               const totalTimeA = a.segments.reduce((acc, el) => acc + el.duration, 0);
               const totalTimeB = b.segments.reduce((acc, el) => acc + el.duration, 0);
               return totalTimeA - totalTimeB;
            });
            break;
         case 'ОПТИМАЛЬНЫЙ':
            sortedTickets = filteredTickets.sort((a, b) => {
               const sumTimeAndPriceA = a.price + a.segments.reduce((acc, el) => acc + el.duration, 0);
               const sumTimeAndPriceB = b.price + b.segments.reduce((acc, el) => acc + el.duration, 0);
               return sumTimeAndPriceA - sumTimeAndPriceB;
            });
            break;
         default:
            sortedTickets = filteredTickets;
      }
      return sortedTickets.slice(0, showMoreCount);
   },
);
