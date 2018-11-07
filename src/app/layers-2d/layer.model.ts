import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Source from 'ol/source/Source';
import Style from 'ol/style';
import Draw  from 'ol/interaction/Draw';


  export class Layer {
    constructor(public layerIndex: number, public layerName: string) {}
  }

  export interface ViewerLayerOptions  {
    name: string;
    //details?: string;
    opacity?: number;
    style?: Style;
    source?: Source;
    visible?: boolean;
    disable?: boolean;
    //extent?: [number, number, number, number];
    //zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    type?: string;
  }


export class ViewerBaseLayer extends TileLayer {
    public name: string;
    public source: Source;
    public visible: boolean;
    public disable: boolean;
    public maxResolution: number;

  
    constructor(options: ViewerLayerOptions) {
      super(options);  
      this.name = options.name;
      this.source = options.source;
      this.visible = options.visible;
      this.disable = options.disable;
      this.maxResolution = options.maxResolution;
    }
}
export class ViewerVectorLayer extends VectorLayer {
    public name: string;
    public source: Source;
    public visible: boolean;
    public disable: boolean;
    public minResolution: number;
    public style: Style;

    constructor(options: ViewerLayerOptions) {
        super(options);  
        this.name = options.name;
        this.source = options.source;
        this.visible = options.visible;
        this.disable = options.disable;
        this.minResolution = options.minResolution;
      }
}
export class ViewerDrawingLayer extends VectorLayer {
  public name: string;
  public source: Source;
  public visible: boolean;
  public disable: boolean;
  public minResolution: number;
  public style: Style;

  constructor(options: ViewerLayerOptions) {
      super(options);  
      this.name = options.name;
      this.source = options.source;
      this.visible = options.visible;
      this.disable = options.disable;
      this.minResolution = options.minResolution;
  }
}

export class ViewerDraw extends Draw {

  public name: string;
  public source: Source;
  public style: Style;
  public type: string;

  constructor(options: ViewerLayerOptions) {
    super(options);  
    this.name = '';
    this.source = options.source;
    this.style = options.style;
    this.type = options.type;
  }
}