import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-filtering',
  templateUrl: './search-filtering.component.html',
  styleUrls: ['./search-filtering.component.scss']
})
export class SearchFilteringComponent implements OnInit {

  public isLayerControlVisible = false;
  public isButtonLayerVisible = true;
  nodes: any[] = null;

  constructor() {
    this.nodes = [
      {
          expanded: true,
          name: 'SU74983312',
          crop: 'AC66',
          area: '7.09 ha'
      },
      {
          expanded: true,
          name: 'SU60997453',
          crop: 'AC66',
          area: '6.0195'
      },
      {
          expanded: true,
          name: 'SU74976716',
          crop: 'AC66',
          area: '2.4067 ha'
      }
  ];
}

  ngOnInit() {
  }

  openSearchFiltering(){
    this.isLayerControlVisible = !this.isLayerControlVisible;
    this.isButtonLayerVisible = !this.isButtonLayerVisible;
  }
  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text, true);
  }
}
