import { Component, OnInit} from '@angular/core';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/xyz';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM,Vector as VectorSource} from 'ol/source.js';
import {Fill, Stroke, Style, Text, Circle as CircleStyle} from 'ol/style';
import Overlay from 'ol/Overlay.js';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  typesCrops = ['All crops', 'AC66', 'AC67'];
  map: Map;
  layer: TileLayer;
  WMS: TileLayer;
  view: View;
  source: XYZ;
  vectorSource: VectorSource;
  vectorLayer: VectorLayer;
  animationDuration = 500;
  featureStyle: Style;
  featureHoverStyle: Style;
  featureSelectedStyle: Style;

  public postsURL = 'https://192.168.25.41:8443/geoserver/hayes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=hayes:Ac66_Ac67_parcels&maxFeatures=500000&outputFormat=application%2Fjson';
  constructor() {
  }
    ngOnInit() {

      var raster = new TileLayer({
        source: new OSM()
      });

      var source = new VectorSource();

      var vector = new VectorLayer({
        source: source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
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
          })
        })
      });


      /**
       * Currently drawn feature.
       * @type {module:ol/Feature~Feature}
       */
      var sketch;


      /**
       * The help tooltip element.
       * @type {Element}
       */
      var helpTooltipElement;


      /**
       * Overlay to show the help messages.
       * @type {module:ol/Overlay}
       */
      var helpTooltip: Overlay;


      /**
       * The measure tooltip element.
       * @type {Element}
       */
      var measureTooltipElement;


      /**
       * Overlay to show the measurement.
       * @type {module:ol/Overlay}
       */
      var measureTooltip;


      /**
       * Message to show when the user is drawing a polygon.
       * @type {string}
       */
      var continuePolygonMsg = 'Click to continue drawing the polygon';


      /**
       * Message to show when the user is drawing a line.
       * @type {string}
       */
      var continueLineMsg = 'Click to continue drawing the line';


      /**
       * Handle pointer move.
       * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
       */
      var map = new Map({
        layers: [raster, vector],
        target: 'map',
        view: new View({
          center: [-11000000, 4600000],
          zoom: 15
        })
      });
    }

    onChange(deviceValue) {
      console.log(deviceValue);
    if(deviceValue=='All crops'){
      var S1 =  new Style({
        fill: new Fill({
        color: '#DEB887'
        }),
          stroke: new Stroke({
          color: 'grey'
        }),
        text: new Text()
        });
        var S2 =  new Style({
          fill: new Fill({
              color: '#FAFAD2'
          }),
          stroke: new Stroke({
              color: 'grey'
          }),
          text: new Text()
        });
    }
    if(deviceValue=='AC66') {
      var S1 =  new Style({
        fill: new Fill({
            color: 'transparent'
        }),
        stroke: new Stroke({
            color: 'transparent'
        }),
        text: new Text()
    });
    }
    else{
      var S1 =  new Style({
        fill: new Fill({
        color: '#DEB887'
        }),
          stroke: new Stroke({
          color: 'grey'
        }),
        text: new Text()
        });
    }
    if(deviceValue=='AC67'){
      var S2 =  new Style({
        fill: new Fill({
            color: 'transparent'
        }),
        stroke: new Stroke({
            color: 'transparent'
        }),
        text: new Text()
      });
    }
    else {
        var S2 =  new Style({
            fill: new Fill({
                color: '#FAFAD2'
            }),
            stroke: new Stroke({
                color: 'grey'
            }),
            text: new Text()
          });
    }
    this.vectorLayer.getSource().forEachFeature(function(feature){
      if ( feature.get('CROP_CODE') == "AC66") {
        S1.getText().setText(feature.get('NGC'));
        feature.setStyle(S1);
      }
      else{
        S2.getText().setText(feature.get('NGC'));
        feature.setStyle(S2);
      }      
    })
  }
    zoomIn() {
          this.map.getView().animate({
            zoom: this.map.getView().getZoom() + 1,
            duration: this.animationDuration
          });
    }

    zoomOut() {
      this.map.getView().animate({
        zoom: this.map.getView().getZoom() - 1,
        duration: this.animationDuration
      });
    }
}
