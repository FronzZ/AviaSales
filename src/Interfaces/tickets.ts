export interface ITicketSegments {
   origin: string;
   destination: string;
   date: string;
   stops: string[];
   duration: number;
}

export interface ITicket {
   price: number;
   carrier: string;
   segments: ITicketSegments[];
}

export interface IFetchTicketsState {
   tickets: ITicket[];
   showMoreCount: number;
   isLoading: boolean;
   onError: boolean;
}
