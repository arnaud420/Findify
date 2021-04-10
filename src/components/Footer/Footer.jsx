import Logo from '../../assets/images/footer_logo.png';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer is-footer">
      <div className="container">
        <div className="columns">
          <div className="column is-flex align-center">
            <img src={Logo} alt="logo" />
          </div>
          <div className="column is-flex align-center justify-end has-text-white">
            © 2021 Findify
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
