import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {
  email: string;
  password: string;

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

  register() {
    console.log("Registrar usuario");
    // Implementar lógica de registro
  }
}
