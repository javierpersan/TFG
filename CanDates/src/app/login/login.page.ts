import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  emailValidationColor: string = 'primary';

  constructor() {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
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
