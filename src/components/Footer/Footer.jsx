import Logo from '../../assets/images/footer_logo.png';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer is-footer">
      <div className="container">
        <div className="columns">
          <div className="column">
            <img src={Logo} alt="logo" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
