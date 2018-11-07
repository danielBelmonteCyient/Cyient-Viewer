import { Component, OnInit } from '@angular/core';

import DragZoom from 'ol/interaction/DragZoom';
import { noModifierKeys } from '../../../../node_modules/ol/events/condition';
import Draw  from 'ol/interaction/Draw';
import Feature from 'ol/Feature';
import Map from 'ol/Map.js';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Style} from 'ol/style';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj.js';
import {defaults as defaultControl} from 'ol/control.js';
import ScaleLine from 'ol/control/ScaleLine';
import { Layers2D } from '../layers-2d.service';

@Component({
  selector: 'app-zoom-measurement',
  templateUrl: './zoom-measurement.component.html',
  styleUrls: ['./zoom-measurement.component.scss']
})

export class ZoomMeasurementComponent implements OnInit {

  map: Map;
  draw: Draw;
  dragZoom: DragZoom;
  animationDuration = 500;
  drawingSource:VectorSource;
  drawingVector:VectorLayer;
  drawingStyle: Style;
  scale: ScaleLine;
  resolIsReached: boolean;
  floatingButtons = [{id:'Zoom-In', icon: 'far fa-plus-square'},
    {id:'Zoom-Out', icon:'far fa-minus-square'},{id:'Box-Zoom', icon:'fas fa-search-plus'},
    {id:'Line', icon:'fas fa-ruler-combined'},{id:'Polygon', icon:'fas fa-draw-polygon'}];

  checkStatus: boolean = false;
  public layers;

  constructor(private mapSecondService: Layers2D) { }

  ngOnInit() {

          this.dragZoom = new DragZoom({
            condition : noModifierKeys,
            duration: 1000
          });

          this.drawingSource = this.mapSecondService.getDrawSource();

          this.drawingStyle = this.mapSecondService.getDrawStyle();

          this.drawingVector = new VectorLayer({
            source: this.drawingSource,
            style: this.drawingStyle
          });

          this.map = new Map({
            target: 'map',
            layers: this.mapSecondService.getTileLayers(),
            view: new View({
              center: fromLonLat([-0.99064159,51.7446673]),
              zoom: 12,
            }),
            controls: defaultControl({
              attributionOptions: {
                collapsible: true
            }
              }).extend([
              this.scale = new ScaleLine({
                units:'metric',
                className: 'ol-scale-line',
                target: document.getElementById('scale-line')
              })
            ])
          });

          this.layers = this.mapSecondService.getLayers(); 


          this.map.getView().on('change:resolution', () => {

            if(this.map.getView().getResolution() < 5){
              this.resolIsReached= false;
            }
            else if(this.map.getView().getResolution() > 5){
              this.resolIsReached= true;
            }

            for (var i = 0; i < Object.keys(this.layers).length; i++) {          
              let layerNameJson = this.layers[i].name;
              if(layerNameJson === null){
                break;
              }
              else if (layerNameJson === 'Ac66-health'){
                let ac66Health: any = <HTMLScriptElement>document.getElementsByName(layerNameJson)[0];
                let ac66HealthButton: any = <HTMLScriptElement>document.getElementsByName('button-'+layerNameJson)[0];
                ac66Health.disabled = this.resolIsReached;
                ac66HealthButton.disabled = this.resolIsReached;
              } 
              else if(layerNameJson === 'Ac67-health'){
                let ac67Health: any = <HTMLScriptElement>document.getElementsByName(layerNameJson)[0];
                let ac67HealthButton: any = <HTMLScriptElement>document.getElementsByName('button-'+layerNameJson)[0];
                ac67Health.disabled = this.resolIsReached;
                ac67HealthButton.disabled = this.resolIsReached;
                }
              else if (layerNameJson === 'Crops-parcels'){
                let parcels: any = <HTMLScriptElement>document.getElementsByName(layerNameJson)[0];
                let parcelsButton: any = <HTMLScriptElement>document.getElementsByName('button-'+layerNameJson)[0];
                parcels.disabled = !this.resolIsReached;
                parcelsButton.disabled = !this.resolIsReached;
                }
            }           
          });

          let checkTools: number = 0;
          if(checkTools === 0){
            this.map.addLayer(this.drawingVector);
            checkTools = 2; 
          }
          this.mapSecondService.addLayerMap.subscribe(layerIndex => {
              this.map.addLayer(this.mapSecondService.getLayer(layerIndex));              
              if(checkTools === 0){
                checkTools = 1;
                this.map.addLayer(this.drawingVector); 
              }
              else if(checkTools === 2){
                this.map.removeLayer(this.drawingVector); 
                this.map.addLayer(this.drawingVector); 
              }
          });

          this.mapSecondService.removeLayerMap.subscribe(layerIndex => {
            this.map.removeLayer(this.mapSecondService.getLayer(layerIndex));
          });

  }
  interaction(event){

    event.target.classList.add('Drawing-layer');
    this.map.removeInteraction(this.dragZoom);


      this.drawingVector.getSource().clear();
      this.map.removeInteraction(this.draw);


    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    let displayValue: string = null;

    if(value === 'Polygon'){
      document.getElementById("measurement").style.visibility = "visible";
      for (let floatingButton of this.floatingButtons) {
        if(floatingButton.id != 'Polygon'){
          document.getElementById(floatingButton.id).classList.remove('clicking-button');
        }
      }
      var resultElement = <HTMLInputElement>document.getElementById('js-result');
      resultElement.innerHTML= 'n/a';
      let layer = this.drawingVector;
      this.draw = this.mapSecondService.getDrawLayer(0);

      this.draw.on('drawstart',(event: any)=> {

          layer.getSource().clear();
          const feature: Feature = event.feature;

          feature.on('change', (event: any) =>{
              let measurement = event.target.getGeometry().getArea();
              displayValue = measurement > 100 ? (measurement / 1000).toFixed(2) + 'km' : measurement.toFixed(2) + 'm';
              resultElement.innerHTML= displayValue + '<sup>2</sup>';
          });
      });

      this.draw.on('drawend', () => {
          this.drawingStyle.getText().setText(displayValue + 2);
      });

      this.map.addInteraction(this.draw);
      }

    else if(value === 'Line'){
      document.getElementById('measurement').style.visibility = "visible";
      for (let floatingButton of this.floatingButtons) {
        if(floatingButton.id != 'Line'){
          document.getElementById(floatingButton.id).classList.remove('clicking-button');
        }
      }
      var resultElement = <HTMLInputElement>document.getElementById('js-result');
      resultElement.innerHTML= 'n/a';
      let layer = this.drawingVector;
      this.draw = this.mapSecondService.getDrawLayer(1);

      this.draw.on('drawstart',(event: any)=> {

          layer.getSource().clear();
          const feature: Feature = event.feature;
          feature.on('change', (event: any) => {
            let measurement = event.target.getGeometry().getLength();
            displayValue = measurement > 100 ? (measurement / 1000).toFixed(2) + 'km' : measurement.toFixed(2) + 'm';
            resultElement.innerHTML= displayValue;
          });
      });
      this.draw.on('drawend', () => {
        this.drawingStyle.getText().setText(displayValue);
        });
        this.map.addInteraction(this.draw);

    }
    else if (value === 'Box-Zoom'){
      document.getElementById('measurement').style.visibility = "hidden";
      for (let floatingButton of this.floatingButtons) {
        if(floatingButton.id != 'Box-Zoom'){
          document.getElementById(floatingButton.id).classList.remove('clicking-button');
        }
      }
      this.map.removeInteraction(this.draw);
      this.drawingVector.getSource().clear();
      this.map.addInteraction(this.dragZoom);
    }
    else if(value === 'Zoom-In'){
      document.getElementById('measurement').style.visibility = "hidden";
      for (let floatingButton of this.floatingButtons) {
        if(floatingButton.id != 'Zoom-In'){
          document.getElementById(floatingButton.id).classList.remove('clicking-button');
        }
      }
      this.map.removeInteraction(this.dragZoom);
      this.drawingVector.getSource().clear();
      this.map.removeInteraction(this.draw);
      this.map.getView().animate({
        zoom: this.map.getView().getZoom() + 1,
        duration: this.animationDuration
      });
    }

    else if(value === 'Zoom-Out'){
      document.getElementById('measurement').style.visibility = "hidden";
      for (let floatingButton of this.floatingButtons) {
        if(floatingButton.id != 'Zoom-Out'){
          document.getElementById(floatingButton.id).classList.remove('clicking-button');
        }
      }
      this.map.removeInteraction(this.dragZoom);
      this.drawingVector.getSource().clear();
      this.map.removeInteraction(this.draw);
      this.map.getView().animate({
        zoom: this.map.getView().getZoom() - 1,
        duration: this.animationDuration
      });
    }
  }

}
