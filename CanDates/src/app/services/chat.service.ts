import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'

})

export class ChatService {
  private chatId: string | null = null;
  constructor(private db: AngularFireDatabase) { }
  
  getMessages(chatId: string) {
    console.log(`Getting messages for chatId: ${chatId}`); // Agrega un mensaje de registro
    return this.db.list(`/chats/${chatId}/messages`, ref => ref.orderByChild('timestamp')).valueChanges().pipe(
      map((messages: any[]) => messages.map(message => ({ sender: message.sender, text: message.text })))
    );
  }

  sendMessage(chatId: string, message: string, sender: string) {
    console.log(`Sending message to chatId: ${chatId}`); // Agrega un mensaje de registro
    return this.db.list(`/chats/${chatId}/messages`).push({ text: message, sender: sender });
  }
  setChatId(chatId: string) {
    this.chatId = chatId;
  }

  getChatId() {
    return this.chatId;
  }
} // Path: CanDates/src/app/services/chat.service.ts

