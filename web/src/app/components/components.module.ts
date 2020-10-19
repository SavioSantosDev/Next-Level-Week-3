import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavActionsComponent } from './nav-actions/nav-actions.component';

@NgModule({
  declarations: [
    NavActionsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavActionsComponent,
  ]
})
export class ComponentsModule { }
