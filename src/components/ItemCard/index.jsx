import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { truncateString } from '../../helpers';
import ROUTES from '../../config/routes';
import './ItemCard.scss';

const RenderComponent = ({ children, isLink, item }) => {
  if (!isLink) {
    return <div className="column is-4">{children}</div>;
  }

  return <Link className="column is-link-container pb-0" to={ROUTES.GET_PLAYLIST.replace(':id', item._id)}>
    {children}
  </Link>
}

const ItemCard = ({ item, onDelete, isInversed, isLink }) => {
  const renderTrash = (hasPadding = false) => (
    onDelete
      ? (
        <span className={`is-clickable title is-6 has-text-danger _is-hoverable ${hasPadding ? 'pl-2' : ''}`}>
          <span onClick={() => onDelete(item)}><FiTrash2 /></span>
        </span>
      )
      : null
  )

  return (
    <>
      <RenderComponent isLink={isLink} item={item}>
        <div className={`card track-card border-0 ${isLink ? "_is-hoverable" : ""}`}>
          <div className="card-image is-relative">
            <figure className="image is-square">
              <img src={item.image} alt={item.title} />
            </figure>
          </div>
          <div className="card-content pl-0 pr-0 pb-0">
            <div className={`content ${isLink ? 'mb-4' : ''}`}>
              <p className={`title is-5 ${isInversed ? 'has-text-white' : 'has-text-primary'}`}>
                {truncateString(item.title, 55)}
              </p>
              {
                item.subtitle
                  ? <p className={`subtitle is-6 ${isInversed ? 'has-text-white' : 'has-text-primary'}`}>{item.subtitle}</p>
                  : null
              }

              {
                !isLink
                  ? renderTrash()
                  : null
              }
            </div>
          </div>
        </div>
      </RenderComponent>
      {
        isLink
          ? renderTrash(true)
          : null
      }
    </>
  );
};

export default ItemCard;
