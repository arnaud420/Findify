import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { truncateString, getArtistBio, getFirstParagraphLength } from '../../helpers';
import TrackBoxList from '../TrackBoxList';
import { closeModal } from '../../actions/modal';
import './ArtistModal.scss';

const ArtsitModal = ({ onAddTrack }) => {
  const dispatch = useDispatch();
  const [bio, setBio] = useState(null);
  const [artistFullBio, setArtistFullBio] = useState(null);
  const [maxLength, setMaxLength] = useState(null);
  const [labelBtn, setLabelBtn] = useState('Voir plus');
  const [displayBtn, setDisplayBtn] = useState(false);

  const { artist, isOpen, isLoading } = useSelector((state) => state.modal);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('html').classList.add('is-clipped');
    } else {
      document.querySelector('html').classList.remove('is-clipped');
    }
  }, [isOpen])

  useEffect(() => {
    if (artist) {
      const artistBio = getArtistBio(artist);
      if (!artistBio) {
        return setBio('Pas de bio disponible');
      }
      const firstParagraphLength = getFirstParagraphLength(artist);
      setArtistFullBio(artistBio);
      setBio(artistBio.length >= firstParagraphLength ? truncateString(artistBio, firstParagraphLength) : artistBio);
      setMaxLength(firstParagraphLength);
      if (artistBio.length > firstParagraphLength) {
        setDisplayBtn(true);
      }
    }
  }, [artist])

  const toggleBio = () => {
    if (bio.length === artistFullBio.length) {
      setLabelBtn('Voir plus');
      setBio(truncateString(artistFullBio, maxLength));
    } else {
      setLabelBtn('Voir moins');
      setBio(artistFullBio);
    }
  }

  return (
    <div className={`modal modal-artist ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => dispatch(closeModal())}></div>
      <div className="modal-content">
        {
          isLoading
            ? 'load'
            : artist
              ? (
                <div>
                  <section className="hero" style={{ backgroundImage: `url('${artist.images[0].url}')` }}>
                    <div className="hero-body">
                      <div className="container">
                        <p className="title">
                          {artist.name}
                        </p>
                        <p className="subtitle">
                          Hero subtitle
                    </p>
                      </div>
                    </div>
                  </section>
                  {
                    bio
                      ?
                      <div className="section">
                        <div className="container">
                          <p dangerouslySetInnerHTML={{ __html: bio }} />
                          {
                            displayBtn
                              ? <button className="mt-2 button is-text" onClick={toggleBio}>{labelBtn}</button>
                              : null
                          }
                        </div>
                      </div>
                      : null
                  }

                  <div className="top-tracks-section">
                    <div className="section">
                      <div className="container">
                        <h2 className="title is-5 has-text-white">Top titres</h2>

                        <TrackBoxList tracks={artist.tracks} isDragDisabled isArtistClickable={false} isAddable onAddTrack={onAddTrack} />
                      </div>
                    </div>
                  </div>
                </div>
              )
              : null
        }
      </div >
      <button className="modal-close is-large" aria-label="close" onClick={() => dispatch(closeModal())} />
    </div >
  );
};

export default ArtsitModal;
