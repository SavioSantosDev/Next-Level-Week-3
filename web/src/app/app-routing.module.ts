import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { OrphanagesMapComponent } from './pages/orphanages-map/orphanages-map.component';
import { OrphanageBaseComponent } from './pages/orphanage-base/orphanage-base.component';
import { OrphanageComponent } from './pages/orphanage/orphanage.component';
import { AddOrphanageComponent } from './pages/add-orphanage/add-orphanage.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'happy', component: OrphanagesMapComponent },
  {
    path: 'orfanato', component: OrphanageBaseComponent,
    children: [
      { path: '', component: OrphanageComponent },
      { path: 'cadastro', component: AddOrphanageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
