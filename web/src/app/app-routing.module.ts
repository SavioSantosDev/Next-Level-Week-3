import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOrphanageComponent } from './pages/add-orphanage/add-orphanage.component';
import { LandingComponent } from './pages/landing/landing.component';
import { OrphanageComponent } from './pages/orphanage/orphanage.component';
import { OrphanagesMapComponent } from './pages/orphanages-map/orphanages-map.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'happy', component: OrphanagesMapComponent },
  { path: 'orfanato', component: OrphanageComponent },
  { path: 'orfanato/cadastro', component: AddOrphanageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
