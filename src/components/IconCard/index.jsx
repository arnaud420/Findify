import ArrowRight from '../../assets/images/arrow_right.png';
import './IconCard.scss';

const IconCard = ({ children, icon }) => (
  <div className="card icon-card is-relative">
    <img src={ArrowRight} alt='arrow right' />
    <div className="card-image">
      <figure className="image is-64x64">
        <img src={icon} alt="icon" />
      </figure>
    </div>
    <div className="card-content">
      <div className="content has-text-centered">
        <p className="title is-5 has-text-white">{children}</p>
      </div>
    </div>
  </div>
)

export default IconCard;