import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { ComponentsModule } from '../components/components.module';
import { LandingComponent } from './landing/landing.component';
import { OrphanagesMapComponent } from './orphanages-map/orphanages-map.component';
import { OrphanageComponent } from './orphanage/orphanage.component';
import { AddOrphanageComponent } from './add-orphanage/add-orphanage.component';
import { OrphanageBaseComponent } from './orphanage-base/orphanage-base.component';

@NgModule({
  declarations: [
    LandingComponent,
    OrphanagesMapComponent,
    OrphanageComponent,
    AddOrphanageComponent,
    OrphanageBaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LeafletModule,
    ComponentsModule
  ]
})
export class PagesModule { }
