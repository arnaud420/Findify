import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { truncateString, getArtistBio, getFirstParagraphLength } from '../../../helpers';
import TrackBoxList from '../../../components/TrackBoxList';
import { closeModal } from '../../../actions/modal';
import Loader from '../../../components/Loader';
import './ArtistModal.scss';

const ArtsitModal = ({ onAddTrack, isAddable }) => {
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
        return setBio(null);
      }
      const firstParagraphLength = getFirstParagraphLength(artist);
      setArtistFullBio(artistBio);
      setBio(artistBio.length >= firstParagraphLength ? truncateString(artistBio, firstParagraphLength) : artistBio);
      setMaxLength(firstParagraphLength);
      if (artistBio.length > firstParagraphLength) {
        setDisplayBtn(true);
      }
    }
    else {
      setBio(null);
      setArtistFullBio(null);
      setMaxLength(null);
      setDisplayBtn(false);
      setLabelBtn('Voir plus');
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
      {
        isLoading
          ? <Loader />
          : <div className="modal-content">
            {
              artist && (
                <div>
                  <section className="hero">
                    <div className="hero-body pb-5 pt-5">
                      <div className="container">
                        <p className="title is-3 has-text-primary">
                          {artist.name}
                        </p>
                      </div>
                    </div>
                  </section>
                  {
                    bio && (
                      <div className="section bio">
                        <div className="container">
                          <p dangerouslySetInnerHTML={{ __html: bio }} />
                          {
                            displayBtn && <button className="button is-link is-outlined is-rounded mt-4" onClick={toggleBio}>{labelBtn}</button>
                          }
                        </div>
                      </div>
                    )
                  }

                  <div className="top-tracks-section">
                    <div className="section" style={{ backgroundImage: `url('${artist.images[0].url}')` }}>
                      <div className="layer" />
                      <div className="container">
                        <h2 className="title is-5 has-text-white">Top titres</h2>

                        <TrackBoxList
                          tracks={artist.tracks}
                          isDragDisabled
                          isArtistClickable={false}
                          isAddable={isAddable}
                          onAddTrack={onAddTrack}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div >
      }
      <button className="modal-close is-large" aria-label="close" onClick={() => dispatch(closeModal())} />
    </div>
  );
};

export default ArtsitModal;
