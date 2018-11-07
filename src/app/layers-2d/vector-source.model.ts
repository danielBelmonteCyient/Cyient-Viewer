import GeoJSON from 'ol/format/GeoJSON.js';

export class SourceVector {
    public url: string; 
    public format:  GeoJSON;

    constructor(url: string, format: GeoJSON) {
        this.url = url;
        this.format = format;
    }
  }
  