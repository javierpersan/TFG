import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as lottie from 'lottie-web';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  email: string;
  password: string;
  emailValidationColor: string = 'primary';

  constructor(private router: Router) {
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
    
    const animation = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'assets/splash.json'
    });

    animation.addEventListener('complete', () => {
      gsap.to(lottieContainer, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (lottieContainer) {
            lottieContainer.remove();
          }
          this.startPageAnimations();
        
        }
      });
    });
  }

  startPageAnimations() {
    gsap.timeline()
      .to('.title', {
        duration: 2,
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

  loginWithGoogle() {
    console.log("Iniciar sesión con Google");
    // Implementar lógica de inicio de sesión con Google
  }

  register() {
    console.log("Registrar usuario");
    // Implementar lógica de registro
    this.router.navigate(['/register']);
  }
}
