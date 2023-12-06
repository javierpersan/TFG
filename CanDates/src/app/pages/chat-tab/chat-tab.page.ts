import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Asegúrate de importar tu servicio UserService
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service'; // Asegúrate de importar tu servicio ChatService
@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.page.html',
  styleUrls: ['./chat-tab.page.scss'],
})
export class ChatTabPage implements OnInit {
  matchedUsers: any[] = []; // Asegúrate de utilizar el tipo de datos correcto para tus usuarios coincidentes
  authenticatedUserEmail: string = ''; // Variable para almacenar el email del usuario autenticado

  constructor(private chatService:ChatService, private router: Router, private navCtrl: NavController, private route: ActivatedRoute,private userService: UserService) { }

  ngOnInit() {
    // Obtener el email del usuario autenticado
    this.authenticatedUserEmail = this.userService.getUserEmail();

    // Cargar la lista de usuarios coincidentes es decir que se encuentren tanto en liked como en be liked
    this.userService.getMatchedUsers().subscribe((users: any[]) => {
      this.matchedUsers = users;
    });
  }

  openChat(email1: string) {
    console.log(`Authenticated user email: ${this.authenticatedUserEmail}`);
    console.log(`Match email: ${email1}`);
    const chatId = this.generateChatId(this.authenticatedUserEmail, email1);
    console.log(`Chat ID: ${chatId}`);
    
    this.chatService.setChatId(chatId);
    this.router.navigate(['/chat']);
  }
  
  generateChatId(email1: string, email2: string): string {
    // Reemplaza los caracteres no permitidos en las rutas de Firebase
    const safeEmail1 = email1.replace('.', ',');
    const safeEmail2 = email2.replace('.', ',');

    // Ordena los emails
    const emails = [safeEmail1, safeEmail2].sort();

    // Concatena los emails de los dos usuarios
    return `${emails[0]}-${emails[1]}`;
  }
}

// Path: CanDates/src/app/pages/chat-tab/chat-tab.page.ts