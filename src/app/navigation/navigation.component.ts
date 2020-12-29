import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BaseMapTypeInterface } from '../interfaces/base-map-type.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  // Set our map properties
  mapCenter = [23.727539, 37.983810];
  basemapType = 'streets-navigation-vector';
  mapZoomLevel = 13;
  
  baseMapTypes: BaseMapTypeInterface[] = [
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/topo.jpg', 'name': 'Topo'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/streets.jpg', 'name': 'Streets'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/satellite.jpg', 'name': 'Satellite'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/hybrid.jpg', 'name': 'Hybrid'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/dark-gray.jpg', 'name': 'Dark Gray'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/gray.jpg', 'name': 'Gray'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/national-geographic.jpg', 'name': 'National Geographic'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/oceans.jpg', 'name': 'Oceans'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/osm.jpg', 'name': 'Osm'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/terrain.jpg', 'name': 'Terrain'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/dark-gray.jpg', 'name': 'Dark Gray Vector'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/gray.jpg', 'name': 'Gray Vector'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/streets.jpg', 'name': 'Streets Vector'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/streets-night.jpg', 'name': 'Streets Night Vector'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/streets-navigation.jpg', 'name': 'Streets Navigation Vector'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/topo.jpg', 'name': 'Topo Vector'},
    {'img': 'https://developers.arcgis.com/javascript/assets/img/apiref/basemap/streets-relief.jpg', 'name': 'Streets Relief Vector'},

  ]

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }

  ngOnInit(): void {
  }

  changeBaseMapType(basemapType: string) {
    var filteredBaseMap = basemapType.toLowerCase().replace(/ /g, '-');
    this.basemapType = filteredBaseMap;
  }

}
