import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  constructor() {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {}

  ngAfterViewInit() {
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
  }
}
