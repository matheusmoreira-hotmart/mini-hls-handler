import Playlist from './playlist';

class PlaylistSelector {
  lowestBandwidth(playlists) {
    console.log('LOWEST BANDWIDTH');

    const sortedPlaylists = playlists.sort(
      (a, b) => a.attributes.BANDWIDTH > b.attributes.BANDWIDTH
    );

    return sortedPlaylists[0];
  }
}

export default new PlaylistSelector();