import { Component, OnInit, ViewChild } from '@angular/core';
import { Layers2D } from '../../layers-2d/layers-2d.service';

declare var $: any;

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

    // Layer variables
    public isLayerControlVisible = false;
    public isButtonLayerVisible = true;
    public layers;
    public tileLayers;
    

    @ViewChild('classicModal') modal;

    constructor(private mapSecondService: Layers2D) { }

    ngOnInit() {

        this.layers = this.mapSecondService.getPopUpLayers();

    }

    // Open modal/popup
    toggle(): void {
        this.modal.show();
    }

    addLayerToMap(layerId: number, layerName: string) {
        
        let checkboxLayer = <HTMLInputElement> document.getElementById("check"+layerId);
        let isChecked = checkboxLayer.checked;

        if(isChecked === true){

            this.mapSecondService.addLayer(layerName, layerId);
        }
        else if(isChecked === false){
            this.mapSecondService.deleteLayer(layerName);
        } 
      }

    save(event: Event): void {
        event.preventDefault();
        this.modal.hide();
    }

}
