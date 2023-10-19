import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTabPage } from './user-tab.page';

const routes: Routes = [
  {
    path: '',
    component: UserTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTabPageRoutingModule {}
