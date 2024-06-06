import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAsideFiltersState } from '../../Interfaces/asideFilter';

const initialState: IAsideFiltersState = {
   filter: [
      {
         id: 1,
         items: [
            { label: 'Все пересадки', status: true },
            { label: 'Без пересадок', status: true },
         ],
      },
      {
         id: 2,
         items: [
            { label: '1 пересадка', status: true },
            { label: '2 пересадки', status: true },
         ],
      },
      {
         id: 3,
         items: [{ label: '3 пересадки', status: true }],
      },
   ],
};

const asideFiltersSlice = createSlice({
   name: 'asideFilters',
   initialState,
   reducers: {
      toggleFilterStatus(state, action: PayloadAction<{ labelName: string }>) {
         const { labelName } = action.payload;

         state.filter.forEach((group) => {
            group.items.forEach((filter) => {
               // Инвертируем фильтр
               if (labelName === filter.label) {
                  filter.status = !filter.status;
               }

               // Ставим статус для всех фильтров в зависимости от того какой статус у фильтра 'Все пересадки'
               if (labelName === 'Все пересадки') {
                  const allTransfers =
                     state.filter
                        .flatMap((filterElem) => filterElem.items)
                        .find((filterLabel) => filterLabel.label === 'Все пересадки')?.status || false;
                  filter.status = allTransfers;
               }

               // Если проставлены все фильтра и снимается один фильтр (какой-либо) убираем отметку с фильтра 'Все пересадки'
               if (labelName !== 'Все пересадки' && filter.label === 'Все пересадки' && filter.status) {
                  filter.status = !filter.status;
               }
            });
         });

         // Автоматически ставлю галочку 'Все фильтра', если другие фильтры активны
         const allCheckedFilters = state.filter
            .flatMap((filterElem) => filterElem.items)
            .filter((filterLabel) => filterLabel.label !== 'Все пересадки')
            .every((filterLabel) => filterLabel.status);

         if (allCheckedFilters) {
            state.filter.forEach((group) =>
               group.items.forEach((filter) => {
                  if (filter.label === 'Все пересадки') {
                     filter.status = true;
                  }
               }),
            );
         }
      },
   },
});

export const { toggleFilterStatus } = asideFiltersSlice.actions;

export default asideFiltersSlice.reducer;
