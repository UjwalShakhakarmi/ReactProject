import styles from "./Logo.module.css";
import LogoImg from "../logo.png";
function Logo() {
  return <img src={LogoImg} alt="WorldWise logo" className={styles.logo} />;
}

export default Logo;
