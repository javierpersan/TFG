import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.interface';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  userEmail: string = '';
  currentIndex: number = 0; // Índice de la tarjeta actual

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsersForMatching();
    this.userEmail = this.userService.getUserEmail();
  }
  likeUserAnimation() {
    const cardElement = document.querySelector('.user-card'); // Selecciona la tarjeta que deseas animar
    
    gsap.to(cardElement, {
      x: 100, // Desplaza la tarjeta hacia la derecha
      opacity: 0, // Hace que la tarjeta desaparezca gradualmente
      duration: 0.5, // Duración de la animación en segundos
      onComplete: () => {
        // Esta función se ejecuta cuando se completa la animación
        // Aquí puedes llamar a la función `likeUser` o realizar otras acciones
        
        // Luego, puedes realizar una animación inversa para mostrar la siguiente tarjeta
        gsap.fromTo(cardElement, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
      }
    });
  }
  
  dislikeUserAnimation() {
    const cardElement = document.querySelector('.user-card'); // Selecciona la tarjeta que deseas animar
    
    gsap.to(cardElement, {
      x: -100, // Desplaza la tarjeta hacia la izquierda
      opacity: 0, // Hace que la tarjeta desaparezca gradualmente
      duration: 0.5, // Duración de la animación en segundos
      onComplete: () => {
        // Esta función se ejecuta cuando se completa la animación
        // Aquí puedes llamar a la función `dislikeUser` o realizar otras acciones
        
        // Luego, puedes realizar una animación inversa para mostrar la siguiente tarjeta
        gsap.fromTo(cardElement, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
      }
    });
  }
  
  loadUsersForMatching() {
    this.loading = true;
    this.userService.getUsersForMatching().subscribe({
      next: (users) => {
        // Filtra la lista de usuarios para excluir al usuario actual
        this.users = users.filter((user) => user.email !== this.userEmail);
        this.loading = false;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.loading = false;
      }
    });
  }

  likeUser(likedUserEmail: string) {
    const currentUserEmail = this.userService.getUserEmail();

    if (currentUserEmail) {
      // Verificar si el usuario está autenticado antes de dar like
      this.userService.likeUser(likedUserEmail, currentUserEmail).then(() => {
        // Actualiza la lista de usuarios a los que les diste like en tu perfil
        this.userService.addToLikedUsers(currentUserEmail, likedUserEmail).then(() => {
          console.log('Like dado al usuario con email:', likedUserEmail);
          // Cambia a la siguiente tarjeta
          this.likeUserAnimation();
          this.moveToNextUser();
        }).catch(error => {
          console.error('Error al agregar al usuario a la lista de likedUsers en tu perfil:', error);
        });
      }).catch(error => {
        console.error('Error al dar like:', error);
      });
    } else {
      console.error('Usuario no autenticado. No se puede dar like.');
      // Puedes manejar el caso de usuario no autenticado aquí
    }
  
  }

  dislikeUser(dislikedUser: User) {
    console.log('Usuario no likeado:', dislikedUser.apodo);
    // Implementa la lógica para el "dislike" aquí
    // Cambia a la siguiente tarjeta
    this.dislikeUserAnimation();
    this.moveToNextUser();
  }

  // Método para mostrar la siguiente tarjeta
  

  goToUserTab() {
    this.router.navigate(['/user-tab']);
  }

  goToChatTab() {
    this.router.navigate(['/chat-tab']);
  }
  moveToNextUser() {
    this.currentIndex++;
    
    // Si llegamos al final de la lista, reiniciamos al principio
    if (this.currentIndex >= this.users.length) {
      this.currentIndex = 0;
    }
}
}
