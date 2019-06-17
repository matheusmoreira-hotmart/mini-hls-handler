import HLS from './hls';
import axios from "axios";

class Segment {
  async load(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    const segmentBytesArray = new Uint8Array(response.data);
    this.append(segmentBytesArray);
  }

  append(bytes) {
    HLS.sourceBuffer.appendBuffer(bytes);
  }
}

export default new Segment();