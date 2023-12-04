import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service'; // Asegúrate de que la ruta de importación sea correcta
import {  ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../services/user.service'; // Asume que 'UserService' es el servicio donde estás almacenando el nombre del usuario

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ChatPage {
  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private chatService: ChatService) { }

  messages: any[] = [];
  newMessage: string = ''; // Add newMessage property

  ngOnInit() {
    this.chatService.getMessages().subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.userService.getUserName().subscribe((sender: string) => {
        this.chatService.sendMessage(this.newMessage, sender).then(() => {
          this.newMessage = '';
        });
      });
    }
  }
}

