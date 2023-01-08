import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <Link to="/imprint">Imprint</Link>
    </div>
  )
}

export default Footer;
