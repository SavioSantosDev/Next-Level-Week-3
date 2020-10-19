import { Component, OnInit } from '@angular/core';
import { faPlus, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orphanages-map',
  templateUrl: './orphanages-map.component.html',
  styleUrls: ['./orphanages-map.component.scss']
})
export class OrphanagesMapComponent implements OnInit {


  faPlus = faPlus;

  faSlideToggleTop: IconDefinition;
  faSlideToggleAside: IconDefinition;
  collapsed = false;

  constructor() { }


  ngOnInit(): void {
    this.collapsed ? this.faSlideToggleTop = faChevronDown : this.faSlideToggleTop = faChevronUp;
    this.collapsed ? this.faSlideToggleAside = faChevronRight : this.faSlideToggleAside = faChevronLeft;
  }


  slideToggle(): void {
    // element.classList.toggle('collapsed')
    this.collapsed = !this.collapsed;   // Assim irá setar a propriedade lá no html com o angular

    this.collapsed ? this.faSlideToggleTop = faChevronDown : this.faSlideToggleTop = faChevronUp;
    this.collapsed ? this.faSlideToggleAside = faChevronRight : this.faSlideToggleAside = faChevronLeft;
  }


}
