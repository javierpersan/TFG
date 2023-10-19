import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetTabPageRoutingModule } from './pet-tab-routing.module';

import { PetTabPage } from './pet-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetTabPageRoutingModule
  ],
  declarations: [PetTabPage]
})
export class PetTabPageModule {}
