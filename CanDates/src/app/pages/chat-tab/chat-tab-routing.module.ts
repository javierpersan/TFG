import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatTabPage } from './chat-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ChatTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatTabPageRoutingModule {}
