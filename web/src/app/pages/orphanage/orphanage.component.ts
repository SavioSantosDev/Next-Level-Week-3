import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HappyService } from 'src/app/services/happy.service';
import { MapComponent } from 'src/app/shared/map/map.component';
import Orphanage from 'src/models/Orphanage';

@Component({
  selector: 'app-orphanage',
  templateUrl: './orphanage.component.html',
  styleUrls: ['./orphanage.component.scss']
})
export class OrphanageComponent extends MapComponent implements OnInit, OnDestroy {

  orphanage$: Observable<Orphanage>;
  orphanageId: string | number;

  imgActive = 0;

  sub: Subscription;

  constructor(
    private happyService: HappyService,
    private route: ActivatedRoute
  ) { super(); }


  ngOnInit(): void {

    // Inicializar o mapa
    this.initializeMapOptions();

    this.orphanageId = this.route.snapshot.params.id;

    this.orphanage$ = this.happyService.showOrphanage(  this.orphanageId  )
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  /**
   * Método sobreposto da classe Map
   */
  onMapReady(  map: any  ): void {
    this.map = map;
    this.sub = this.orphanage$.subscribe( data => {
      this.initializeMarker(  data.orphanage_data.latitude, data.orphanage_data.longitude  );
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
