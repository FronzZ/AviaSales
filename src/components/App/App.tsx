import { useEffect } from 'react';

import Header from '@/Header/Header';
import Main from '@/Main/Main';
import styles from '@/App/App.module.scss';

import { fetchTickets, fetchSearchId } from '../../redux/thunkActions/ticketThunk';
import { useAppDispatch } from '../../hooks/hooks';

export default function App() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchSearchId()).then((response) =>
         response.meta.requestStatus === 'fulfilled' ? dispatch(fetchTickets()) : undefined,
      );
   }, [dispatch]);

   return (
      <div className={styles.app}>
         <Header />
         <Main />
      </div>
   );
}
