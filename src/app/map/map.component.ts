import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges
} from "@angular/core";

import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap = "imagery";
  private _loaded = false;
  private _view: esri.MapView = null;
  private _places = [];

  private EsriMap; 
  private EsriMapView;
  private EsriLocator;
  private EsriGraphic;

  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set places(places: string[]) {
    this._places = places;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor() {}

  findPlaces(pt, view, Graphic) {
    var locator = new this.EsriLocator({
      url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    });

    locator.addressToLocations({
      location: pt,
      categories: this._places,
      maxLocations: 50,
      outFields: ["Place_addr", "PlaceName"]
    }).then(function(results) {
      view.popup.close();
      view.graphics.removeAll();
      results.forEach(function(result){
        view.graphics.add(
          new Graphic({
            attributes: result.attributes,
            geometry: result.location,
            symbol: {
             type: "simple-marker",
             color: "#000000",
             size: "12px",
             outline: {
               color: "#ffffff",
               width: "2px"
             }
            },
            popupTemplate: {
              title: "{PlaceName}",
              content: "{Place_addr}"
            }
         }));
      });
    });
  }

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      [this.EsriMap, this.EsriMapView, this.EsriLocator, this.EsriGraphic] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/tasks/Locator",
        "esri/Graphic"
      ]);

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new this.EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      this._view = new this.EsriMapView(mapViewProperties);
      
      this.findPlaces(this._view.center, this._view, this.EsriGraphic)

      await this._view.when();
      return this._view;
    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then();
  }

  ngOnChanges() {
    this.initializeMap().then();
  }

  ngOnDestroy() {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
  }

  updatePlaces(event) {
    var point = this._view.toMap(event)
    this.findPlaces(point, this._view, this.EsriGraphic)
  }
}
