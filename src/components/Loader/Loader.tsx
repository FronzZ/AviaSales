import { BarLoader } from 'react-spinners';

import styles from '@/Loader/Loader.module.scss';

import { useAppSelector } from '../../hooks/hooks';

export default function Loader() {
   const loading = useAppSelector((state) => state.tickets.isLoading);
   return (
      <div className={styles.loader}>
         <BarLoader color="#2196f3" width="100%" height={5} speedMultiplier={0.4} loading={loading} />
      </div>
   );
}
