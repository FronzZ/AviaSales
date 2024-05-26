import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAsideFiltersState } from '../../Interfaces/asideFilter';

const initialState: IAsideFiltersState = {
   filter: [
      {
         id: 1,
         items: [
            { label: 'Все пересадки', status: false },
            { label: 'Без пересадок', status: false },
         ],
      },
      {
         id: 2,
         items: [
            { label: '1 пересадка', status: false },
            { label: '2 пересадки', status: false },
         ],
      },
      {
         id: 3,
         items: [{ label: '3 пересадки', status: false }],
      },
   ],
};

const asideFiltersSlice = createSlice({
   name: 'asideFilters',
   initialState,
   reducers: {
      toggleFilterStatus(state, action: PayloadAction<{ labelName: string }>) {
         return {
            ...state,
            filter: [
               ...state.filter.map((group) => ({
                  ...group,
                  items: [
                     ...group.items.map((filter) => {
                        if (filter.label === action.payload.labelName) {
                           return { ...filter, status: !filter.status };
                        }

                        if (action.payload.labelName === 'Все пересадки') {
                           const allTransfers =
                              state.filter
                                 .flatMap((filterElem) => filterElem.items)
                                 .find((filterLabel) => filterLabel.label === 'Все пересадки')?.status || false;

                           return { ...filter, status: !allTransfers };
                        }

                        if (
                           action.payload.labelName !== 'Все пересадки' &&
                           filter.label === 'Все пересадки' &&
                           filter.status
                        ) {
                           return { ...filter, status: false };
                        }

                        if (action.payload.labelName !== 'Все пересадки' && filter.label === 'Все пересадки') {
                           const allOthersTrue = [...state.filter.flatMap((filterElem) => filterElem.items)]
                              .map((filterLabel) =>
                                 filterLabel.label === action.payload.labelName
                                    ? { ...filterLabel, status: !filterLabel.status }
                                    : filterLabel,
                              )
                              .filter((filterLabel) => filterLabel.label !== 'Все пересадки')
                              .every((filterLabel) => filterLabel.status);

                           return { ...filter, status: allOthersTrue };
                        }

                        return filter;
                     }),
                  ],
               })),
            ],
         };
      },
   },
});

export const { toggleFilterStatus } = asideFiltersSlice.actions;

export default asideFiltersSlice.reducer;
