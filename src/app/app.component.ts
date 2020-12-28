import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'isi'
  // Set our map properties
  mapCenter = [23.727539, 37.983810];
  basemapType = 'streets-navigation-vector';
  mapZoomLevel = 13;
}
