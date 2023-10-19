import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetTabPage } from './pet-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PetTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetTabPageRoutingModule {}
