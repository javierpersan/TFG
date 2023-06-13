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
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailValidationColor = emailPattern.test(this.email) ? 'primary' : 'danger';
  }
  
  login() {
    console.log("Iniciar sesión");
    // Aquí puedes agregar la lógica real para el inicio de sesión con Firebase u otro servicio de autenticación
  }

  loginWithGoogle() {
    console.log("Iniciar sesión con Google");
    // Aquí puedes agregar la lógica real para el inicio de sesión con Google
  }
  register() {
    // Agrega la lógica para redirigir a la página de registro u otras acciones relacionadas con el registro
  }
  
  
}
