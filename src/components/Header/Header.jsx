import Logo from './Logo'; // Your logo component
import Sociolite from './Sociolite'; // Your SVG image component
import styles from "./Header.module.scss"
import style from "../../styles/float.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Sociolite />
    </header>
  );
};

export default Header;
