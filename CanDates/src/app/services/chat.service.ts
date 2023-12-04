import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'

})

export class ChatService {
  constructor(private db: AngularFireDatabase) { }

  getMessages() {
    return this.db.list('/messages', ref => ref.orderByChild('timestamp')).valueChanges().pipe(
      map((messages: any[]) => messages.map(message => ({ sender: message.sender, text: message.text })))
    );
  }

  sendMessage(message: string, sender: string) {
    return this.db.list('/messages').push({ text: message, sender: sender });
  }
} // Path: CanDates/src/app/services/chat.service.ts

