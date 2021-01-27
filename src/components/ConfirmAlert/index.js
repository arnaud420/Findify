import { confirmAlert } from 'react-confirm-alert'; // Import

const Alert = ({ onDelete, onClose, message }) => (
  <div className="box">
    <div className="title is-4">Supprimer cet élément ?</div>
    <p className="mb-3">{message || 'Voulez-vous vraiment supprimer cet élément ?'}</p>
    <div className="field is-grouped">
      <p className="control">
        <button
          className="button is-primary"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Supprimer
        </button>
      </p>
      <p className="control">
        <button
          className="button"
          onClick={onClose}
        >
          Annuler
        </button>
      </p>
    </div>
  </div>
);

export default Alert;
