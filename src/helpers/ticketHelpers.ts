import { lightFormat } from 'date-fns';

// Город вылета / Город прилета
export const departureArrivalCity = (origin: string, destination: string): string => `${origin} - ${destination}`;

//  Время вылета / Время прилета
export const departureArrivalTime = (date: string, duration: number): string => {
   const departureTime = new Date(date);
   const flightTime = lightFormat(new Date(0, 0, 0, 0, duration), 'HH:mm').split(':');

   const [flyTimeHours, flyTimeMin] = flightTime;
   const arrivalTime = new Date(date);
   arrivalTime.setHours(departureTime.getHours() + +flyTimeHours);
   arrivalTime.setMinutes(departureTime.getMinutes() + +flyTimeMin);
   const formattedDepartureTime = lightFormat(departureTime, 'HH:mm');
   const formattedArrivalTime = lightFormat(arrivalTime, 'HH:mm');
   return `${formattedDepartureTime} - ${formattedArrivalTime}`;
};

// Время в пути
export const travelTime = (duration: number): string => {
   return lightFormat(new Date(0, 0, 0, 0, duration), 'HHч mmм');
};

// Количество пересадок
export const stopsCounter = (transfers: string[]): string => {
   switch (transfers.length) {
      case 0:
         return 'БЕЗ ПЕРЕСАДОК';
      case 1:
         return '1 ПЕРЕСАДКА';
      default:
         if (transfers.length <= 4) {
            return `${transfers.length} ПЕРЕСАДКИ`;
         }

         return `${transfers.length} ПЕРЕСАДОК`;
   }
};

// Пересадки
export const stops = (transfers: string[]): string => transfers.join(', ');
