import axios from "axios";
import { Parser as m3u8Parser } from "m3u8-parser";

import Segment from './segment';
import HLS from './hls';

const STATUS = {
  WAITING: 'WAITING',
  READY: 'READY'
}

class Playlist {
  constructor() {
    this.status = STATUS.READY;
    this.url = '';
    this.mediaIndex = 0;        
    this.interval = null;
    this.segments = [];
  }

  async request(url) {
    this.url = url;

    const response = await axios.get(url);
    return response.data;
  }

  async load(segmentsURI) {
    const data = await this.request(segmentsURI);
    const manifest = this.parse(data);
    this.manifest = manifest;
    
    console.log(`LOADED SEGMENTS: ${manifest.segments.length}`);
    this.fillBuffer(manifest.segments);
  }

  fillBuffer(segments) {
    this.interval = setInterval(() => this.shouldLoadSegment(segments), 500)
  }

  shouldLoadSegment(segments) {
    this.segments.push(segments);

    const duration = this.sumTimeSegments(...this.segments);
    const loadedBufferTimeDiff = HLS.tech.currentTime() - duration;

    const firstSegment = segments[0];

    const isSegmentLoadable = loadedBufferTimeDiff < firstSegment.duration && 
                              this.status === STATUS.READY && 
                              !this.isSegmentsBuffered();
    if (isSegmentLoadable) {
      this.handleSegment();
    }
  }
  
  isSegmentsBuffered() {
    return this.mediaIndex === this.segments.length
  }

  async handleSegment(segments) {
    this.status = STATUS.WAITING;
    const currentSegment = this.segments[this.mediaIndex];

    await Segment.load(currentSegment.uri);
    this.mediaIndex += 1;

    if (this.isSegmentsBuffered()) {
      clearInterval(this.interval);
      this.load(this.url);
    }

    this.status = STATUS.READY;    
  }

  sumTimeSegments(segments) {
    const reducer = (accumulator, current) => accumulator + current.duration;
    return segments.reduce(reducer, 0);
  }

  parse(data) {
    const parser = new m3u8Parser();
    parser.push(data);
    parser.end();

    return parser.manifest;
  }
}

export default new Playlist();