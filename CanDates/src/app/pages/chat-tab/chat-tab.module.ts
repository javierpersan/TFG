import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatTabPageRoutingModule } from './chat-tab-routing.module';

import { ChatTabPage } from './chat-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatTabPageRoutingModule
  ],
  declarations: [ChatTabPage]
})
export class ChatTabPageModule {}
