import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import lottie from 'lottie-web';
import { gsap } from 'gsap';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  email: string;
  password: string;
  emailValidationColor: string = 'primary';

  constructor(private router: Router, private authService: AuthServiceService) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
    this.playLottieAnimation();
  }

  ngAfterViewInit() {
    // Las animaciones relacionadas con la página de inicio de sesión se manejarán después de que la animación Lottie haya terminado.
  }

  playLottieAnimation() {
    const lottieContainer = document.getElementById('lottie-container');
    
    if (!lottieContainer) {
        console.error('Lottie container not found');
        return;
    }
    
    const animation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: false, // Asegúrate de que loop está establecido en false
        autoplay: true,
        path: 'assets/splash.json'
    });

    let repeatCount = 0; // Contador para el número de repeticiones
    const maxRepeats = 5; // Número máximo de repeticiones deseadas

    animation.addEventListener('complete', () => {
        repeatCount++; // Incrementa el contador cada vez que la animación se completa

        if (repeatCount < maxRepeats) {
            // Si no hemos alcanzado el número máximo de repeticiones, reinicia la animación
            animation.goToAndPlay(0, true);
        } else {
            // Si hemos alcanzado el número máximo de repeticiones, procede como desees
            gsap.to(lottieContainer, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    lottieContainer.remove();
                    this.startPageAnimations();
                }
            });
        }
    });
}



  startPageAnimations() {
    gsap.timeline()
      .to('.title', {
        duration: 1.5,
        fontSize: '4em',
        top: '10%',
        left: '50%',
        ease: 'power2.out',
      })
      .to('.animation-container', {
        duration: 1,
        height: '100px',
        backgroundColor: 'transparent',
        ease: 'power2.inOut',
      }, "-=1")
      .to('.login-container', {
        duration: 1,
        opacity: 1,
        ease: 'power2.out',
      });
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailValidationColor = emailPattern.test(this.email) ? 'primary' : 'danger';
  }
  
  login() {
    console.log("Iniciar sesión");
    // Implementar lógica de inicio de sesión
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      console.log('Usuario autenticado con Google!');
      // Aquí puedes agregar cualquier lógica adicional después de que el usuario inicie sesión.
      // Por ejemplo, redirigir a otra página.
    } catch (error) {
      console.error('Error al autenticar con Google:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
    }
  }
  

  register() {
    console.log("Registrar usuario");
    // Implementar lógica de registro
    this.router.navigate(['/register']);
  }
}
