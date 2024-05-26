import styles from '@/Header/Header.module.scss';

export default function Header() {
   return (
      <header className={styles.header}>
         <div className={styles.header__logo}>
            <img src="/img/Logo.svg" alt="Logo" />
         </div>
      </header>
   );
}
