import { Component, OnInit } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { Map, latLng, MapOptions, Marker, tileLayer, icon, marker } from 'leaflet';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  template: '<div></div>'
})
export class MapComponent {

  constructor() {}

  map: Map;
  mapOptions: MapOptions;

  orphanageMarker: Marker;
  orphanagesMarker: Marker[] = [];    // Marcador para todos os orfanatos já criados

  private centerLat =  -14.8741722;
  private centerLgn =  -40.8301056;  // Coordenadas de Vitória da Conquista.


  /**
   * Função para inicializar as configurações do mapa
   * A visão geral do mapa será sobre as cidade Conquista, com as coordenadas na propriedade center
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
  initializeMarker(  lat = 0, lng = 0  ): void {
    this.orphanageMarker = new Marker(
      [ lat, lng ],
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
  createMarkerOrphanages(  lat: number, lgn: number, orphanageName: string, orphanageId: number  ): void {
    const newMarker =  marker(
      [ lat, lgn ],
      {
        icon: icon({
          iconSize: [64, 72],
          iconAnchor: [32, 72],
          popupAnchor: [0, -80],
          iconUrl: 'assets/icons/marker.svg'
        })
      }
    );
    newMarker.bindPopup(  this.showPopup(orphanageName, orphanageId)  );
    // circle.bindPopup(this.popupService.makeCapitalPopup(c));
    this.orphanagesMarker.push(newMarker);
  }


  // Novo método de elementos customizados para adicionar a popup ao DOM
  showPopup(  orphanageName: string, orphanageId: number  ): NgElement & WithProperties<PopupComponent> {

    // Criar o elemento
    const popupEl: NgElement & WithProperties<PopupComponent> = document.createElement('popup-element') as any;

    // // Listen to the close event
    // popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

    // Configurando as propriedades da popup
    popupEl.orphanageName = orphanageName;
    popupEl.orphanageId = orphanageId;

    // Adicionando-o ao DOM
    // document.body.appendChild(popupEl);

    return popupEl;
  }

}
