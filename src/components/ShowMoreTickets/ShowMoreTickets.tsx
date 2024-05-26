import styles from '@/ShowMoreTickets/ShowMoreTickets.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { incrementShowMoreCount } from '../../redux/slices/ticketsSlice';
import { selectActualFilters } from '../../redux/selectors/ticketSelectors';

export default function ShowMoreTickets() {
   const dispatch = useAppDispatch();
   const actualAsideFilters = useAppSelector(selectActualFilters);
   return (
      <div className={styles.showMoreTickets}>
         {actualAsideFilters.length !== 0 && (
            <button
               className={styles.showMoreTickets__button}
               type="button"
               onClick={() => dispatch(incrementShowMoreCount())}
            >
               ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
            </button>
         )}
      </div>
   );
}
