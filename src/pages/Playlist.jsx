import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { breadcrumb } from '../config/routes';
import { getPlaylist, editPlaylist, savePlaylistToSpotify, reGeneratePlaylist } from '../helpers/api';
import Breadcrumb from '../components/Breadcrumb';
import TrackBoxList from '../components/TrackBoxList';
import ArtsitModal from '../components/ArtistModal';
import PlaylistOptions from '../components/PlaylistOptions';
import Loader from '../components/Loader';
import TrackCardList from '../components/TrackCardList';

const Playlist = () => {
  const { id } = useParams();
  const [generatedTracks, setGeneratedTracks] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [playlistType, setPlaylistType] = useState('public');
  const [duration, setDuration] = useState(0);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegeneratingPlaylist, setIsReneratingPlaylist] = useState(false);
  const [isSendingToSpotify, setIsSendingToSpotify] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getPlaylist(id);
        setPlaylist(data);
        setGeneratedTracks(data.generatedTracks);
        if (data.name) {
          setName(data.name);
        }
        if (data.spotifyId === null) {
          setIsEditable(true);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('error', error);
      }
    })()
  }, [id])

  //TODO: A chaque modification de la playlist, la mettre a jour en base
  useEffect(() => {
    if (playlist && playlist.tracks && playlist.tracks.length >= 1) {
      let durationMs = 0;
      for (let i = 0; i < playlist.tracks.length; i++) {
        if (!playlist.tracks[i].duration_ms) return;
        durationMs += playlist.tracks[i].duration_ms;
      }
      setDuration(durationMs);
    } else {
      setDuration(0);
    }
  }, [playlist])

  const removeTrack = (track) => {
    setPlaylist({
      ...playlist,
      tracks: [...playlist.tracks.filter((t) => t.id !== track.id)]
    });
  }

  const addTrack = (track) => {
    const trackAlreadyInList = playlist.tracks.find((t) => track.id === t.id);

    if (trackAlreadyInList) {
      setPlaylist({
        ...playlist,
        tracks: [
          track,
          ...playlist.tracks.filter((t) => track.id !== t.id),
        ]
      });
    } else {
      setPlaylist({
        ...playlist,
        tracks: [
          track,
          ...playlist.tracks,
        ]
      });
    }
  }

  const editCurrentPlaylist = async (body) => {
    try {
      return await editPlaylist(id, body);
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }

  const dragTrack = (track) => {
    const sourceIdx = parseInt(track.source.index);
    const destIdx = parseInt(track.destination.index);
    const newList = [...playlist.tracks];
    newList.splice(sourceIdx, 1);
    newList.splice(destIdx, 0, playlist.tracks[sourceIdx]);
    setPlaylist({
      ...playlist,
      tracks: newList,
    });
  };

  const savePlaylist = async () => {
    try {
      setIsSendingToSpotify(true);
      await editCurrentPlaylist({
        tracks: playlist.tracks,
        public: playlistType === 'public' ? true : false,
      });
      const newPlaylist = await savePlaylistToSpotify(id);
      setIsSendingToSpotify(false);
      setIsEditable(false);
      setPlaylist(newPlaylist.data.data);
    } catch (error) {
      setIsSendingToSpotify(false);
      console.error('err', error);
    }
  }

  const onDurationChange = async (e) => {
    const value = e.target.value;
    if (value === '0') return;

    try {
      setIsReneratingPlaylist(true);
      const data = await reGeneratePlaylist(id, value);
      setPlaylist({
        ...playlist,
        tracks: data,
      });
      setIsReneratingPlaylist(false);
    } catch(error) {
      setIsReneratingPlaylist(false);
      console.error('err', error);
    }
  }

  if (isLoading) {
    return (
      <Layout className="is-flex justify-center align-center">
        <Loader />
      </Layout>
    )
  }

  if (!playlist) {
    return (
      <div>La playlist n'existe pas</div>
    )
  }

  return (
    <Layout>
      <Breadcrumb items={breadcrumb.playlistBreadCrumb(playlist.name || playlist._id)} />

      <ArtsitModal onAddTrack={addTrack} isAddable={isEditable} />

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
                  ? <TrackCardList tracks={generatedTracks} isInversed />
                  : null
              }
            </div>
          </div>
        </div>
      </section>

      {
        playlist.tracks
          ? (
            <>
              <PlaylistOptions
                playlist={playlist}
                duration={duration}
                onSavePlaylist={savePlaylist}
                onSearchTrack={addTrack}
                isLoading={isSendingToSpotify}
                isEditable={isEditable}
                playlistType={playlistType}
                onSetPlaylistType={(e) => setPlaylistType(e.target.value)}
                onDurationChange={onDurationChange}
              />

              {
                isRegeneratingPlaylist
                ? <Loader />
                : <TrackBoxList 
                    tracks={playlist.tracks} 
                    onDelete={removeTrack} 
                    onDragEnd={dragTrack} 
                    isDeletable={isEditable}
                    isDragDisabled={isEditable ? false : true}
                  /> 
              }
            </>
          )
          : null
      }
    </Layout >
  );
}

export default Playlist;
