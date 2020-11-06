import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HappyService } from 'src/app/services/happy.service';
import Orphanage from 'src/models/Orphanage';

@Component({
  selector: 'app-orphanage',
  templateUrl: './orphanage.component.html',
  styleUrls: ['./orphanage.component.scss']
})
export class OrphanageComponent implements OnInit {

  orphanage$: Observable<Orphanage>;
  orphanageId: string | number;

  imgActive = 0;

  constructor(
    private happyService: HappyService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.orphanageId = this.route.snapshot.params.id;

    this.orphanage$ = this.happyService.showOrphanage(  this.orphanageId  )
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

}
