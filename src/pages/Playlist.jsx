import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import TrackCard from '../components/TrackCard';
import { breadcrumb } from '../config/routes';
import { getPlaylist, editPlaylist, savePlaylistToSpotify } from '../helpers/api';
import Breadcrumb from '../components/Breadcrumb';
import TrackBoxList from '../components/TrackBoxList';
import ArtsitModal from '../components/ArtistModal';
import PlaylistOptions from '../components/PlaylistOptions';

const Playlist = () => {
  const { id } = useParams();
  const [generatedTracks, setGeneratedTracks] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [duration, setDuration] = useState(0);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

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
        if (data.spotifyId === null) {
          setIsEditable(true);
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
        if (!tracks[i].duration_ms) return;
        durationMs += tracks[i].duration_ms;
      }
      setDuration(durationMs);
    }
  }, [tracks])

  const removeTrack = (track) => {
    setTracks([
      ...tracks.filter((t) => t.id !== track.id)
    ]);
  }

  const addTrack = (track) => {
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
      return await editPlaylist(id, body);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  const dragTrack = (track) => {
    const sourceIdx = parseInt(track.source.index);
    const destIdx = parseInt(track.destination.index);
    const newList = [...tracks];
    newList.splice(sourceIdx, 1);
    newList.splice(destIdx, 0, tracks[sourceIdx]);
    setTracks(newList);
  };

  const savePlaylist = async () => {
    try {
      console.log('saveplaylist');
      setIsLoading(true);
      await editCurrentPlaylist({ tracks });
      await savePlaylistToSpotify(id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('err', error);
    }
  }

  console.log('isEditable', isEditable);

  return (
    <Layout>
      {/* <Breadcrumb items={breadcrumb.playlistBreadCrumb()} /> */}

      <ArtsitModal onAddTrack={addTrack} />

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
                        disabled={isEditable ? false : true}
                        onChange={isEditable ? (e) => setName(e.value) : undefined}
                        onBlur={isEditable ? (e) => editCurrentPlaylist({ name: e.target.value }) : undefined}
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

      {
        tracks
          ? (
            <>
              <PlaylistOptions
                tracks={tracks}
                duration={duration}
                onSavePlaylist={savePlaylist}
                onSearchTrack={addTrack}
                isLoading={isLoading}
                idEditable={isEditable}
              />

              <TrackBoxList tracks={tracks} onDelete={removeTrack} onDragEnd={dragTrack} isDeletable />
            </>
          )
          : null
      }
    </Layout >
  );
}

export default Playlist;
