import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ItemCard from '../../../components/ItemCard';
import ArrowLeft from '../../../assets/images/arrow_left.png';
import ArrowRight from '../../../assets/images/arrow_right.png';
import './PlaylistCardList.scss';

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + ' _is-hoverable'}
      onClick={onClick}
    >
      <img src={ArrowRight} alt="arrow right" />
    </div>
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + ' _is-hoverable'}
      onClick={onClick}
    >
      <img src={ArrowLeft} alt="arrow left" />
    </div>
  );
}

const initialState = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  touchMove: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const PlaylistCardList = ({ playlists, onPlaylistDelete }) => {
  const [settings, setSettings] = useState(initialState);

  const onResize = () => {
    if (window.innerWidth <= 767) {
      setSettings({
        ...settings,
        slidesToScroll: 1,
        slidesToShow: 1,
      })
    } else {
      setSettings({
        ...initialState,
        infinite: false,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [])



  useEffect(() => {
    if (playlists && playlists.length >= 1) {
      if (playlists.length < settings.slidesToShow) {
        setSettings({
          ...settings,
          infinite: false,
        })
      }
      onResize();
    }
  }, [playlists])

  if (!playlists || playlists.length <= 0) {
    return null;
  }

  return (
    <Slider {...settings}>
      {
        playlists.map((playlist) =>
          <ItemCard
            key={`playlistcard_${playlist._id}`}
            onDelete={(playlist) => onPlaylistDelete(playlist)}
            item={{
              ...playlist,
              image: playlist.images.length >= 1 ? playlist.images[1].url : playlist.generatedTracks[0].album.images[1].url,
              title: playlist.name || playlist._id,
            }}
            isLink={true}
          />)
      }
    </Slider>
  );
};

export default PlaylistCardList;
