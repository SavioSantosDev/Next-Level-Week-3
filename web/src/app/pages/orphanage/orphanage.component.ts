import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HappyService } from 'src/app/services/happy.service';

@Component({
  selector: 'app-orphanage',
  templateUrl: './orphanage.component.html',
  styleUrls: ['./orphanage.component.scss']
})
export class OrphanageComponent implements OnInit, OnDestroy {


  sub: Subscription;

  constructor(
    private happyService: HappyService
  ) { }

  ngOnInit(): void {
    this.sub = this.happyService.listOrphanages('orphanages').subscribe(
      data => {
        console.log(data);
      }
    );
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
