const ROUTES = {
  HOME: '/',
  CREATE_PLAYLIST: '/playlists/create',
  GET_PLAYLISTS: '/playlists',
  GET_PLAYLIST: '/playlists/:id',
};

const playlistBreadCrumb = (currentPlaylistName) => [
  {
    link: ROUTES.GET_PLAYLISTS,
    label: 'Mes playlists',
  },
  {
    link: false,
    label: currentPlaylistName,
  }
];

export const breadcrumb = {
  playlistBreadCrumb,
}

export default ROUTES;
