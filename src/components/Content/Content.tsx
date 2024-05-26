import TicketSorter from '@/TicketSorter/TicketSorter';
import Loader from '@/Loader/Loader';
import TicketList from '@/TicketList/TicketList';
import ShowMoreTickets from '@/ShowMoreTickets/ShowMoreTickets';
import styles from '@/Content/Content.module.scss';

export default function Content() {
   return (
      <div className={styles.content}>
         <TicketSorter />
         <Loader />
         <TicketList />
         <ShowMoreTickets />
      </div>
   );
}
