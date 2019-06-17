import HLS from './hls';

import PlaylistSelector from './playlist-selector';
import Playlist from './playlist';
import PlaylistMimeType from './playlist-mime-type';

class MasterPlaylist {
  get url() {
    return this._url;
  }

  set url(value) {
    let basePlaylistURL = value;

    while (basePlaylistURL.slice(-1) !== '/') {
      basePlaylistURL = basePlaylistURL.slice(0, -1);
    }

    this._url = value;
    this.baseUrl = basePlaylistURL;
  }

  async load(url) {
    const data = await Playlist.request(url);
    this.url = url;

    const manifest = Playlist.parse(data);
    this.manifest = manifest;

    const chosenPlaylist = PlaylistSelector.lowestBandwidth(manifest.playlists);
    const chosenPlaylistFileName = chosenPlaylist.uri.split('/').pop();
    this.chosenPlaylist = chosenPlaylist;

    Playlist.load(`${this.baseUrl}${chosenPlaylistFileName}`);
  }

  inputSourceBuffer() {
    const mimeType = PlaylistMimeType.getMimeType(this.chosenPlaylist);
    HLS.sourceBuffer = HLS.mediaSource.addSourceBuffer(mimeType);
  }
}

export default new MasterPlaylist();