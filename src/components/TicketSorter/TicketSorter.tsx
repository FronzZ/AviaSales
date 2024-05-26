import styles from '@/TicketSorter/TicketSorter.module.scss';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { changeTicketSorterStatus } from '../../redux/slices/ticketSorterSlice';

export default function TicketSorter() {
   const ticketSorterTabs = useAppSelector((state) => state.ticketSorter.ticketSorter);
   const dispatch = useAppDispatch();
   return (
      <div className={styles.ticketSorter}>
         {ticketSorterTabs.map((tab) => (
            <button
               type="button"
               key={tab.label}
               className={`${styles.ticketSorterButton} ${tab.status && styles['ticketSorterButton--active']}`}
               onClick={() => dispatch(changeTicketSorterStatus({ labelName: tab.label }))}
            >
               {tab.label}
            </button>
         ))}
      </div>
   );
}
