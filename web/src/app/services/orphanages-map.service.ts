import { Injectable, Component } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, marker, Marker, LeafletMouseEvent, Layer, icon } from 'leaflet';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrphanagesMapService {

  map: Map;
  mapOptions: MapOptions;

  orphanageMarker: Marker;
  orphanagesMarker: Marker[] = [];    // Marcador para todos os orfanatos já criados

  private centerLat =  -14.8741722;
  private centerLgn =  -40.8301056;  // Coordenadas de Vitória da Conquista.

  constructor() { }


  /**
   * Função para inicializar as configurações do mapa
   */
  initializeMapOptions(): void {
    this.mapOptions = {
      center: latLng(this.centerLat, this.centerLgn),
      zoom: 13,
      layers: [
        tileLayer(
          `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${environment.MAPBOX_TOKEN}`,
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          }
        )
      ]
    };
  }


  /**
   * Função chamada no template quando o mapa estiver pronto.
   */
  onMapReady(map: Map): void {
    this.map = map;
  }


  /**
   * Inicializa um marcador e adiciona-o ao mapa
   * As coordenadas do marcador serão configuradas com o método setMarkerPosition
   */
  initializeMarker(): void {
    this.orphanageMarker = new Marker(
      [ 0, 0 ],
      {
        icon: icon({
          iconSize: [64, 72],
          iconAnchor: [32, 72],
          iconUrl: 'assets/icons/marker.svg'
        })
      }
    );
    this.orphanageMarker.addTo(this.map);
  }


  /**
   * Receberá a latitude e longitude passados pelo usuário ao clicar em determinado ponto no mapa
   * O marcador já criado
   */
  setMarkerPosition(  lat: number , lng: number  ): void {

    this.orphanageMarker.setLatLng([lat, lng]);
  }


  /**
   * Cria um marcador e adicionar ao array para os marcadores de orfanato
   */
  createMarkerOrphanages(  lat: number, lgn: number  ): void {
    const newMarker =  marker(
      [ lat, lgn ],
      {
        icon: icon({
          iconSize: [64, 72],
          iconAnchor: [32, 72],
          // popupAnchor: [0, -72],
          iconUrl: 'assets/icons/marker.svg'
        })
      }
    );
    newMarker.bindPopup();
    // circle.bindPopup(this.popupService.makeCapitalPopup(c));
    this.orphanagesMarker.push(newMarker);
  }


  showPopup(): void {

  }
}



