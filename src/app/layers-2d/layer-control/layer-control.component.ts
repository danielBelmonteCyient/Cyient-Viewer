import { Component, OnInit } from '@angular/core';
import { Layers2D } from '../layers-2d.service';
import Map from 'ol/Map.js';
declare var $: any;

@Component({
  selector: 'app-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.scss']
})

export class LayerControlComponent implements OnInit {
  
  map: Map;

  public isLayerControlVisible = false;
  public isButtonLayerVisible = true;
  public layers;
  public tileLayers;

  constructor(private mapSecondService: Layers2D) { }

  ngOnInit() {
    this.layers = this.mapSecondService.getLayers(); 
    this.tileLayers = this.mapSecondService.getTileLayers();

    this.mapSecondService.addLayerMap.subscribe(layerIndex => {
      if(layerIndex != null ){
        $('#chooseLayer').remove();
      }
    });

    // this.map.getView().on('change:resolution', () => {
      
    // });
  }

  openLayersControl(){
    this.isLayerControlVisible = !this.isLayerControlVisible;
    this.isButtonLayerVisible = !this.isButtonLayerVisible;
  }

  updateTileLayer(event){
    this.mapSecondService.layerTileControl(event);
  }

  updateChecked(layerId: number) { 
    this.mapSecondService.layercontrol(layerId);
  }

  clicklayerName(layerId: number) {

    var elm = $('#checkbox'+layerId);
    elm.prop('checked', !elm.prop('checked'));
    this.mapSecondService.layercontrol(layerId);
  }
}
