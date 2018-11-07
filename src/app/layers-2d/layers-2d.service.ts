import { Injectable, Output, EventEmitter } from "@angular/core";
import  { ViewerBaseLayer, ViewerDraw, Layer, ViewerVectorLayer}  from "../layers-2d/layer.model";
import XYZ from 'ol/source/XYZ.js';
import {Vector as VectorSource} from 'ol/source';
import {Fill, Stroke, Style, Text, Circle as CircleStyle} from 'ol/style';
import { Subject } from "rxjs";
import TileWMS from 'ol/source/TileWMS';
import GeoJSON from 'ol/format/GeoJSON';
import Icon from 'ol/style/Icon';

@Injectable()
export class Layers2D {

  ingredientsChanged = new Subject<any[]>();

  @Output() change: EventEmitter<number> = new EventEmitter();
  @Output() changeTileLayer: EventEmitter<number> = new EventEmitter();

  @Output() addLayerMap: EventEmitter<number> = new EventEmitter();
  @Output() removeLayerMap: EventEmitter<number> = new EventEmitter();

  json = require('./organisations.json');

  private drawingSource = new VectorSource();
  private drawingStyle = new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.3)'
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33'
      })
    }),
    text: new Text({
      text: '',
      textAlign: 'center',
      textBaseline: 'middle',
      font: 'normal 12px Roboto',
      fill: new Fill({
        color: 'white'
      }),
      backgroundFill: new Fill({
        color: [0, 0, 0, 0.6]
      }),
      overflow: true,
      offsetX: 0,
      offsetY: 0,
      rotation: 0,
      padding: [5, 8, 5, 8]
    })
  }); 
  private drawingLayers = [
    new ViewerDraw({
      name: '',
      source: this.drawingSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.7)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 4
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      }),
      type: 'Polygon'
    }),
    new ViewerDraw({
      name: '',
      source: this.drawingSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.7)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 4
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      }),
      type: 'LineString'
    })
  ]

  private tileLayers = [

      new ViewerBaseLayer ({
      name: 'Topo-Map',
      source: new XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
      }),
      visible: true
      }),
      new ViewerBaseLayer ({
        name: 'Imagery',
        source: new XYZ({
          attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
              'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Imagery/MapServer/tile/{z}/{y}/{x}'
        }),
        visible: false

      }),
      new ViewerBaseLayer ({
          name: 'Shaded-Relief-Map',
          source: new XYZ({
            attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                'World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
          }),
          visible: false
      
      })
  ];

  public popUpLayers = [];
  public viewerLayers = [];
  public testLayers = [];

   addLayer(layerName: string, layerid: number) {

      let name = this.json.orgs[0].layers[layerid].name;
      if((this.json.orgs[0].layers[layerid].layerType) === 'TileWMS'){
        this.viewerLayers.push(
          new ViewerBaseLayer ({
            name: this.json.orgs[0].layers[layerid].name,
            source: new TileWMS(this.json.orgs[0].layers[layerid].source),
            visible: this.json.orgs[0].layers[layerid].visible,
            disable: this.json.orgs[0].layers[layerid].disable,
            maxResolution: this.json.orgs[0].layers[layerid].maxResolution
          })
        );
      }

      else if (((this.json.orgs[0].layers[layerid].layerType) === 'VectorSource')){
        this.viewerLayers.push(
          new ViewerVectorLayer ({
            name: this.json.orgs[0].layers[layerid].name,
            source: new VectorSource({
              url: this.json.orgs[0].layers[layerid].url,
              format: new GeoJSON()
            }),
            visible: this.json.orgs[0].layers[layerid].visible,
            disable: this.json.orgs[0].layers[layerid].disable,
            minResolution: this.json.orgs[0].layers[layerid].minResolution,
            style: 
            (feature) => {
              if(name === 'Crops-parcels'){
                if ( feature.get('CROP_CODE') == "AC66") {
                  feature.setStyle(new Style({
                    fill: new Fill({
                    color: '#FAFAD2'
                    }),
                      stroke: new Stroke({
                      color: 'grey'
                    }),
                    text: new Text()
                    }));
                }
                else {
                  feature.setStyle(new Style({
                    fill: new Fill({
                        color: '#DEB887'
                    }),
                    stroke: new Stroke({
                        color: 'grey'
                    }),
                    text: new Text()
                  }));
                }  
              }
              else if(name === 'Crops-Images'){
                if ( feature.get('CROP_CODE') == "AC66") {
                  feature.setStyle(
                    new Style({
                      image: new Icon({
                        opacity: 0.9,
                        scale: 0.2,
                        src: 'assets/img/Wheat_regular.png'
                      })
                    })
                  );
                }
                else {
                  feature.setStyle(
                    new Style({
                      image: new Icon({
                        opacity: 0.9,
                        scale: 0.2,
                        src: 'assets/img/Oilseed_regular.png'
                      })
                    })
                  );
                }
              }
            }
          })
        );
      }
    this.ingredientsChanged.next(this.viewerLayers.slice());
    let layerIndex;
    for (var i = 0; i < Object.keys(this.viewerLayers).length; i++) {
          
      let layerNameJson = this.viewerLayers[i].name;
      
      if(layerNameJson === layerName){
        layerIndex = i;    
        break;
      }
    }
    this.addLayerMap.emit(layerIndex);
  }

  deleteLayer(layerName: string){
    
    let layerIndex;

    for (var i = 0; i < Object.keys(this.viewerLayers).length; i++) {
          
          let layerNameJson = this.viewerLayers[i].name;
          
          if(layerNameJson === layerName){
            layerIndex = i;    
            break;
          }
    }
    this.removeLayerMap.emit(layerIndex); 
    this.viewerLayers.splice(layerIndex, 1);
    this.ingredientsChanged.next(this.viewerLayers.slice());
  }

  getPopUpLayers(){
    for (var i = 0; i < Object.keys(this.json.orgs[0].layers).length; i++) {
        this.popUpLayers[i] =
        new Layer (i,this.json.orgs[0].layers[i].name);
    }
    return this.popUpLayers;
  }


  getLayers() {
  return this.viewerLayers;
  }

  getTileLayers() {
    return this.tileLayers;
  }

  getTileLayersLength() {
    return this.tileLayers.length;
  }

  getLayer(index?: number) {
    return this.viewerLayers[index];  
  }

  getTileLayer(index?: number) {
    return this.tileLayers[index];
  }

  getDrawLayer(index?: number) {
    return this.drawingLayers[index];
  }

  getDrawStyle () {
    return this.drawingStyle;
  }

  getDrawSource() {
    return this.drawingSource;
  }

  layercontrol(index?: number) {
    this.change.emit(index);
    return this.viewerLayers[index];
  }

  layerTileControl(layerIndex: number) {
    this.changeTileLayer.emit(layerIndex);
    return this.tileLayers[layerIndex];
  }

  // saveLayerControl(layers: ViewerBaseLayer[]): void {
  //   this.viewerLayers = layers;
  // }
}