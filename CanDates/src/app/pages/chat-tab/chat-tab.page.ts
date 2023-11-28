import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Asegúrate de importar tu servicio UserService

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.page.html',
  styleUrls: ['./chat-tab.page.scss'],
})
export class ChatTabPage implements OnInit {
  matchedUsers: any[] = []; // Asegúrate de utilizar el tipo de datos correcto para tus usuarios coincidentes

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Cargar la lista de usuarios coincidentes desde Firebase o tu fuente de datos
    this.userService.getMatchedUsers().subscribe((users: any[]) => {
      this.matchedUsers = users;
    });
  }

  openChat(email: string) {
    // Lógica para abrir el chat con el usuario seleccionado
  }
}
