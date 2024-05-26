import styles from '@/AsideFilters/AsideFilters.module.scss';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { toggleFilterStatus } from '../../redux/slices/asideFiltersSlice';

export default function AsideFilters() {
   const asideFilters = useAppSelector((state) => state.asideFilters.filter);
   const dispatch = useAppDispatch();

   return (
      <aside className={styles.aside}>
         <div className={styles.filter}>
            <div className={styles.filter__description}>
               <span className={styles['filter__description-text']}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
            </div>
            <div className={styles.filter__labels}>
               {asideFilters.map((group) => (
                  <div key={group.id} className={styles['filter__labels-wrapper']}>
                     {group.items.map((filter) => (
                        <label key={filter.label} className={styles.filter__label}>
                           <input
                              className={styles.filter__input}
                              type="checkbox"
                              checked={filter.status}
                              onChange={() => dispatch(toggleFilterStatus({ labelName: filter.label }))}
                           />
                           <span className={styles['filter__custom-checkbox']} />
                           <span className={styles.filter__text}>{filter.label}</span>
                        </label>
                     ))}
                  </div>
               ))}
            </div>
         </div>
      </aside>
   );
}
