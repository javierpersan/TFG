import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { AuthService } from '../services/auth-service.service'; // Asegúrate de que la ruta es correcta
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 
  
  successMessage: string = '';


  constructor(private authService: AuthService, private router: Router,    private afAuth: AngularFireAuth,) {}

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

  // Método para registrar un usuario con correo electrónico y contraseña
  async register() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      this.successMessage = 'Usuario registrado con éxito!';
      this.errorMessage = '';
    } catch (error) {
      console.error('Error:', error);
      this.errorMessage = 'Ocurrió un error al intentar registrar el usuario. tu correo no existe o ya hay un usuario con ese correo ';


      
  }
}

}