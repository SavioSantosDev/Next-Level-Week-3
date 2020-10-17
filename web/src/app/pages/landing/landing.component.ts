import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', '../grid.scss']
})
export class LandingComponent implements OnInit {

  faArrowRight = faArrowRight;

  constructor() { }

  ngOnInit(): void {
  }

}
