import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  // @HostBinding('@state') state: 'opened' | 'closed' = 'closed'; // Estado da popup: aberto ou fechado
  // @Output() closed = new EventEmitter();

  @Input() orphanageName: string;
  @Input() orphanageId: number;

  faArrowRight = faArrowRight;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onNavigate(): void {
    this.router.navigate(['/orfanato', this.orphanageId]);
  }

}
