import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavActionsComponent } from './nav-actions/nav-actions.component';
import { ControlErrorComponent } from './control-error/control-error.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    NavActionsComponent,
    ControlErrorComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavActionsComponent,
  ],
  entryComponents: [
    PopupComponent
  ]
})
export class ComponentsModule { }
