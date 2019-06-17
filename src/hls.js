import MasterPlaylist from './master-playlist';
import { MediaSource as VideoJSMediaSource, URL } from 'videojs-contrib-media-sources';

const Component = videojs.getComponent('Component');

class HLS {
  constructor() {
    this.mediaSource = new VideoJSMediaSource({ mode: 'html5' });

    this.sourceBuffer = null;
    this.tech = null;
  }

  init() {
    const tech = videojs.getTech('Html5');

    this.tech = tech;
    this.tech.registerSourceHandler(HLSSourceHandler, 0);
  }
}

const hls = new HLS();

class HlsHandler extends Component {
  constructor(source, tech, options) {
    super(tech, options.hls);

    hls.tech = tech;
  }

  async src(url) {
    await MasterPlaylist.load(url);
    hls.mediaSource.addEventListener('sourceopen', () => MasterPlaylist.inputSourceBuffer());

    const mediaSourceBlobUrl = URL.createObjectURL(hls.mediaSource);
    hls.tech.src(mediaSourceBlobUrl);
  }
}

const HLSSourceHandler = {
  canHandleSource(source) {
    return HLSSourceHandler.canPlayType(source.type);
  },
  handleSource(source, tech, options = {}) {
    const localOptions = videojs.mergeOptions(videojs.options, options);

    tech.hls = new HlsHandler(source, tech, localOptions);
    tech.hls.src(source.src);

    return tech.hls;
  },
  canPlayType(type) {
    let mpegurlRE = /^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i;
    
    return mpegurlRE.test(type) ? 'maybe' : '';
  }
}

videojs.HlsHandler = HlsHandler;
videojs.HlsSourceHandler = HLSSourceHandler;
videojs.Hls = hls;

export default hls;