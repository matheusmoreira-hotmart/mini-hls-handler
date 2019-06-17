class PlaylistMimeType {
  getMimeType(playlist) {
    const codecs = this.getCodecs(playlist);
    const container = this.getContainerType(playlist.segments);

    return `video/${container}; codecs="${codecs}"`;
  }

  getCodecs(playlist) {
    return playlist.attributes.CODECS;
  }

  getContainerType(segments = []) {
    return segments.length ? 'mp4' : 'mp2t';
  }
}

export default new PlaylistMimeType();