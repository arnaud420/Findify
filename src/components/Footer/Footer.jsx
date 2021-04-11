import Logo from '../../assets/images/footer_logo.png';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer is-footer">
      <div className="container">
        <div className="columns is-vcentered is-mobile">
          <div className="column">
            <img src={Logo} alt="logo" />
          </div>
          <div className="column has-text-right has-text-white">
            {/* © 2021 Findify */}
            2021 Findify
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
