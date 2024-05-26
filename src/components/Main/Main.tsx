import Content from '@/Content/Content';
import AsideFilters from '@/AsideFilters/AsideFilters';
import styles from '@/Main/Main.module.scss';

export default function Main() {
   return (
      <main className={styles.main}>
         <AsideFilters />
         <Content />
      </main>
   );
}
