import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTabPageRoutingModule } from './user-tab-routing.module';

import { UserTabPage } from './user-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabPageRoutingModule
  ],
  declarations: [UserTabPage]
})
export class UserTabPageModule {}
