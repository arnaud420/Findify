import { GiLunarModule } from 'react-icons/gi';

export const truncateString = (string, nb, truncatedTxt) => {
  if (string.length > nb) {
    return string.substr(0, nb) + (truncatedTxt ? ' ...' : '');
  }
  return string;
};

export const msToTime = (duration) => {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${hours} h ${minutes} min`;
}

export const getArtistBio = (artist) => {
  if (artist.strBiographyFR) {
    return artist.strBiographyFR.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
  } else if (artist.strBiographyEN) {
    return artist.strBiographyEN.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
  } else {
    return null;
  }
}

export const getFirstParagraphLength = (artist) => {
  if (artist.strBiographyFR) {
    return artist.strBiographyFR.match(/[^\r\n]+/g)[0].length;
  } else if (artist.strBiographyEN) {
    return artist.strBiographyEN.match(/[^\r\n]+/g)[0].length;
  } else {
    return null;
  }
}