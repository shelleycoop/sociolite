// components/Header.js
import Image from 'next/image';
import styles from './Header.module.scss';
import MySvg from '../../../public/static/sociolite.svg'

const Header = () => {

  return (
    <header className={styles.header} >
      <div className={styles.topLeftImage}>
        <Image 
        className='image-fade'
          src="/static/logo.png" 
          alt="Logo" 
          width={200} 
          height={200} 
        />
      </div>
      <div className={`styles.centerImage`}>
        {/* <svg>
          <rect>

          </rect>
        </svg> */}
        <MySvg
        width= {800} height={600} 
        />

      </div>
    </header>
  );
};

export default Header;
