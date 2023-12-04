import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Asegúrate de importar tu servicio UserService
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.page.html',
  styleUrls: ['./chat-tab.page.scss'],
})
export class ChatTabPage implements OnInit {
  matchedUsers: any[] = []; // Asegúrate de utilizar el tipo de datos correcto para tus usuarios coincidentes

  constructor(private router: Router, private navCtrl: NavController, private route: ActivatedRoute,private userService: UserService) { }

  ngOnInit() {
    // Cargar la lista de usuarios coincidentes es decir que se encuentren tanto en liked como en be liked
    this.userService.getMatchedUsers().subscribe((users: any[]) => {
      this.matchedUsers = users;
    });
  }

  openChat(email: string) {
    this.router.navigate(['/chat', email]);
  }
}
