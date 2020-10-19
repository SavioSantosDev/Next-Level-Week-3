import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-actions',
  templateUrl: './nav-actions.component.html',
  styleUrls: ['./nav-actions.component.scss']
})
export class NavActionsComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.location.back();
  }

}
