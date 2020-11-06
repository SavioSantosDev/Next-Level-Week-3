import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { faPlus, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { Subscription } from 'rxjs';

import { HappyService } from 'src/app/services/happy.service';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { MapComponent } from 'src/app/shared/map/map.component';


@Component({
  selector: 'app-orphanages-map',
  templateUrl: './orphanages-map.component.html',
  styleUrls: ['./orphanages-map.component.scss']
})
export class OrphanagesMapComponent extends MapComponent implements OnInit, OnDestroy {

  faPlus = faPlus;

  faSlideToggleTop: IconDefinition;
  faSlideToggleAside: IconDefinition;
  collapsed = false;

  sub: Subscription;    // Inscrição para pegar os orfanatos

  PopupElement: NgElementConstructor<unknown>;

  constructor(
    private happyService: HappyService,
    injector: Injector
  ) {
    super();
    // Converter 'PopupComponent' em um elemento customizado
    this.PopupElement = createCustomElement(PopupComponent, {injector});
  }


  ngOnInit(): void {

    // Verificar se o elemento já foi registrado se não registrar o elemento com browser
    // tslint:disable-next-line: no-unused-expression
    customElements.get('popup-element') || customElements.define('popup-element', this.PopupElement);
    // if (!(não)FOI REGISTRADO) { REGISTRE } SIMILAR AO DE CIMA

    // Inicializar o mapa, função da classe map
    this.initializeMapOptions();

    this.collapsed ? this.faSlideToggleTop = faChevronDown : this.faSlideToggleTop = faChevronUp;
    this.collapsed ? this.faSlideToggleAside = faChevronRight : this.faSlideToggleAside = faChevronLeft;

    // Requisitando os orfanatos e criando os marcadores
    this.sub = this.happyService.listOrphanages().subscribe(
      data => {
        data.forEach(  orphanage => {
          this.createMarkerOrphanages(  orphanage.latitude, orphanage.longitude, orphanage.name, orphanage.id  );
        });
      }, error => console.log(error)
    );
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  slideToggle(): void {
    // element.classList.toggle('collapsed')
    this.collapsed = !this.collapsed;   // Assim irá setar a propriedade lá no html com o angular

    this.collapsed ? this.faSlideToggleTop = faChevronDown : this.faSlideToggleTop = faChevronUp;
    this.collapsed ? this.faSlideToggleAside = faChevronRight : this.faSlideToggleAside = faChevronLeft;
  }


}
