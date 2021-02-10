import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsMusicNoteList } from 'react-icons/bs';
import { TiMediaFastForward } from 'react-icons/ti';
import Layout from '../components/Layout';
import Search from '../components/Search';
import TrackCard from '../components/TrackCard';
import TrackSearch from '../components/TrackSearch';
import ROUTES from '../config/routes';
import { msToTime } from '../helpers';
import { getPlaylist, editPlaylist } from '../helpers/api';
import Breadcrumb from '../components/Breadcrumb';
import TrackBoxList from '../components/TrackBoxList';

const Playlist = () => {
  const { id } = useParams();
  const [generatedTracks, setGeneratedTracks] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [duration, setDuration] = useState(0);
  const [name, setName] = useState('');

  const breadcrumbLinks = [
    {
      link: ROUTES.GET_PLAYLISTS,
      label: 'Mes playlists',
    },
    {
      link: false,
      label: 'Playlist ...',
    }
  ];

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylist(id);
        console.log('DATA', data);
        setTracks(data.tracks);
        setGeneratedTracks(data.generatedTracks);
        if (data.name) {
          setName(data.name);
        }
      } catch (error) {
        console.log('error', error);
      }
    })()
  }, [id])

  useEffect(() => {
    if (tracks && tracks.length >= 1) {
      let durationMs = 0;
      for (let i = 0; i < tracks.length; i++) {
        durationMs += tracks[i].duration_ms;
      }
      console.log('durationMs', durationMs);
      setDuration(durationMs);
    }
  }, [tracks])

  const removeTrack = (track) => {
    setTracks([
      ...tracks.filter((t) => t.id !== track.id)
    ]);
  }

  const onTrackClicked = (track) => {
    const trackAlreadyInList = tracks.find((t) => track.id === t.id);

    if (trackAlreadyInList) {
      setTracks([
        track,
        ...tracks.filter((t) => track.id !== t.id),
      ]);
    } else {
      setTracks([
        track,
        ...tracks,
      ]);
    }
  }

  const editCurrentPlaylist = async (body) => {
    try {
      const data = await editPlaylist(id, body);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <Layout>
      <Breadcrumb items={breadcrumbLinks} />

      <section className="hero">
        <div className="hero-body">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <div className="columns">
                <div className="column">
                  <div className="track-search">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        name="name"
                        placeholder="Nom de ta playlist"
                        value={name}
                        onChange={(e) => setName(e.value)}
                        onBlur={(e) => editCurrentPlaylist({ name: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {
                generatedTracks
                  ? (
                    <div className="columns">
                      {generatedTracks.map((track) =>
                        <TrackCard key={`trackcard_${track.id}`} track={track} isInversed />
                      )}
                    </div>
                  )
                  : null
              }
            </div>
          </div>
        </div>
      </section>

      <div className="columns">
        <div className="column is-6">

          {
            tracks
              ? (
                <div>
                  <div className="box">
                    <p><span className="icon is-left"><BsMusicNoteList /></span>Nombre de musiques: {tracks.length}</p>
                    <p><span className="icon is-left"><TiMediaFastForward /></span>Durée de la playlist: {msToTime(duration)}</p>
                  </div>

                  <div className="mb-2">
                    <TrackSearch onTrackClicked={onTrackClicked} placeholder="Ajouter une musique à la playlist" />
                  </div>

                  <TrackBoxList tracks={tracks} onDelete={removeTrack} />
                </div>
              )
              : null
          }
        </div>
      </div>
    </Layout>
  );
}

export default Playlist;
