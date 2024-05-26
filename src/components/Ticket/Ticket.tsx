import styles from '@/Ticket/Ticket.module.scss';

import { ITicket } from '../../Interfaces/tickets';
import {
   departureArrivalCity,
   departureArrivalTime,
   stopsCounter,
   stops,
   travelTime,
} from '../../helpers/ticketHelpers';

export default function Ticket({ ticket }: { ticket: ITicket }) {
   return (
      <li className={styles.ticket}>
         <div className={styles['ticket__price-and-airline']}>
            <span className={styles.ticket__price}>{`${ticket.price} ₽`}</span>
            <img
               className={styles['ticket__airline-logo']}
               src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
               alt="AviaLogo"
            />
         </div>
         <div className={styles.ticket__transfers}>
            {ticket.segments.map((segment) => (
               <div
                  className={styles.ticket__transfer}
                  key={`${segment.origin}-${segment.destination}-${segment.date}`}
               >
                  <div className={styles['ticket__transfer-info']}>
                     <span className={styles['ticket__transfer-description']}>
                        {departureArrivalCity(segment.origin, segment.destination)}
                     </span>
                     <span className={styles['ticket__transfer-stats']}>
                        {departureArrivalTime(segment.date, segment.duration)}
                     </span>
                  </div>
                  <div className={styles['ticket__transfer-info']}>
                     <span className={styles['ticket__transfer-description']}>В ПУТИ</span>
                     <span className={styles['ticket__transfer-stats']}>{travelTime(segment.duration)}</span>
                  </div>
                  <div className={styles['ticket__transfer-info']}>
                     <span className={styles['ticket__transfer-description']}>{stopsCounter(segment.stops)}</span>
                     <span className={styles['ticket__transfer-stats']}>{stops(segment.stops)}</span>
                  </div>
               </div>
            ))}
         </div>
      </li>
   );
}
