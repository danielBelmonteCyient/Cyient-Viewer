import { Component, OnInit, Injectable} from '@angular/core';

import Map from 'ol/Map.js';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';

import { Layers2D } from '../../../layers-2d/layers-2d.service';

@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.css']
})

@Injectable()

export class ButtonsComponent implements OnInit {
    map: Map;
    vectorLayer: VectorLayer;
    drawingSource:VectorSource;
    drawingVector:VectorLayer;

    //Emitters
    layerIndex: number;
    layerTileIndex: number;
  

    constructor(private mapSecondService: Layers2D) { }

    ngOnInit() {

        this.mapSecondService.change.subscribe(layerIndex => {
          this.layerIndex = layerIndex;
          this.vectorLayer = this.mapSecondService.getLayer(layerIndex); 
          if(this.vectorLayer.getVisible() === true){
            this.vectorLayer.setVisible(false);
          }
          else {
            this.vectorLayer.setVisible(true);
          }          
        });

        this.mapSecondService.changeTileLayer.subscribe(layerTileIndex => {
          this.layerTileIndex = layerTileIndex;
          
            for(let i=0; i< this.mapSecondService.getTileLayersLength(); i++){
            
              if(this.layerTileIndex === i){
                this.vectorLayer = this.mapSecondService.getTileLayer(i); 
                this.vectorLayer.setVisible(true); 
              }
              else{
                this.vectorLayer = this.mapSecondService.getTileLayer(i); 
                this.vectorLayer.setVisible(false); 
              }
            }       
        });     
    }
}
