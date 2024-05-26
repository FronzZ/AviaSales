export interface IFilterItem {
   label: string;
   status: boolean;
}

export interface IFilterGroup {
   id: number;
   items: IFilterItem[];
}

export interface IAsideFiltersState {
   filter: IFilterGroup[];
}
