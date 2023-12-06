import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service'; // Asegúrate de que la ruta de importación sea correcta
import {  ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../services/user.service'; // Asume que 'UserService' es el servicio donde estás almacenando el nombre del usuario
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ChatPage {
  messages: any[] = [];
  newMessage: string = ''; // Add newMessage property
  chatId: string | null = null;
  user: any; // Add user property
  constructor(private userService: UserService, private route: ActivatedRoute, private chatService: ChatService) {
    this.chatId = this.chatService.getChatId();
   }  
 

  ngOnInit() {
    console.log(this.chatId)
    this.chatId = this.chatService.getChatId();
    console.log(`Chat ID: ${this.chatId}`);
    if (this.chatId) {
      this.chatService.getMessages(this.chatId).subscribe((messages: any[]) => {
        this.messages = messages;
      });
    }
  }

  sendMessage() {
    if (this.chatId && this.newMessage.trim() !== '') {
      this.userService.getUserName().subscribe((sender: string) => {
        if (this.chatId) { // Verifica si this.chatId es null
          this.chatService.sendMessage(this.chatId, this.newMessage, sender).then(() => {
            this.newMessage = '';
          });
        }
      });
    } else if (!this.chatId) {
      console.log('chatId is empty');
    }
  }

  getChatId(): string {
    // retornar el chat id de la variable chatId
    return this.chatId || '';
  }

}
// Path: CanDates/src/app/pages/chat/chat.page.ts

