import { useEffect, useState } from 'react';
import { truncateString } from '../../helpers';
import './ArtistModal.scss';
import TrackBoxList from '../TrackBoxList';

const getArtistBio = (artist) => {
  if (artist.strBiographyFR) {
    return artist.strBiographyFR.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
  } else if (artist.strBiographyEN) {
    return artist.strBiographyEN.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
  } else {
    return null;
  }
}

const getFirstParagraphLength = (artist) => {
  if (artist.strBiographyFR) {
    return artist.strBiographyFR.match(/[^\r\n]+/g)[0].length;
  } else if (artist.strBiographyEN) {
    return artist.strBiographyEN.match(/[^\r\n]+/g)[0].length;
  } else {
    return null;
  }
}

const ArtsitModal = ({ isOpen, setIsOpen, artist }) => {
  const [bio, setBio] = useState(null);
  const [artistFullBio, setArtistFullBio] = useState(null);
  const [maxLength, setMaxLength] = useState(null);
  const [labelBtn, setLabelBtn] = useState('Voir plus');
  const [displayBtn, setDisplayBtn] = useState(false);

  useEffect(() => {
    if (artist) {
      const artistBio = getArtistBio(artist);
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
      <div className="modal-background" onClick={() => setIsOpen(false)}></div>
      <div className="modal-content">
        {
          artist
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

                      <TrackBoxList tracks={artist.tracks} isDragDisabled isArtistClickable={false} isAddable />
                    </div>
                  </div>
                </div>
              </div>
            )
            : null
        }
      </div >
      <button className="modal-close is-large" aria-label="close" onClick={() => setIsOpen(false)} />
    </div >
  );
};

export default ArtsitModal;
