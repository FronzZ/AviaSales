import { v4 as uuidv4 } from 'uuid';

import Ticket from '@/Ticket/Ticket';
import styles from '@/TicketList/TicketList.module.scss';

import { useAppSelector } from '../../hooks/hooks';
import { selectActualFilters, selectTicketsByFilter } from '../../redux/selectors/ticketSelectors';

export default function TicketList() {
   const actualAsideFilters = useAppSelector(selectActualFilters);
   const filteredTickets = useAppSelector(selectTicketsByFilter);

   return actualAsideFilters.length === 0 ? (
      <p className={styles['empty-filters-text']}>Рейсов, подходящих под заданные фильтры, не найдено</p>
   ) : (
      <ul className={styles.tickets__list}>
         {filteredTickets.map((ticketStats) => (
            <Ticket key={uuidv4()} ticket={ticketStats} />
         ))}
      </ul>
   );
}
