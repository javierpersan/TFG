import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private userEmail: string | null = null;

  constructor(private auth: Auth, private platform: Platform, private router: Router) { }

  async registerWithEmail(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  async loginWithGoogle(): Promise<void> {
    let userCredential
    if (this.platform.is('capacitor')) {
      // Autenticación para Android usando Capacitor
      try {
        const result = await GoogleAuth.signIn();
        console.log(result.email);
        if (result && result.email) {
          this.setUserEmail(result.email);  // Almacenar el correo electrónico
          console.log('User logged in with Google on Android!');
          this.router.navigate(['home']);  // Redireccionar al usuario a la página 'home'
          return;
        } else {
          console.error('No se pudo obtener el correo electrónico del usuario en Android.');
        }
      } catch (error) {
        console.error(' in with Google on Android:', error  );
        //this.router.navigate(['home']);  // Redireccionar al usuario a la página 'home'
        return;
      }
    } else {
      try {
        userCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        console.log('User logged in with Google!');
      } catch (error) {
        console.error('Error logging in with Google:', error);
        return;
      }
    }
  
    // Si la autenticación fue exitosa, obtenemos el correo electrónico y lo almacenamos en el servicio
    if (userCredential && userCredential.user && userCredential.user.email) {
      this.setUserEmail(userCredential.user.email);
      this.router.navigate(['home']);  // Redireccionamos al usuario a la página 'home'
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario.');
    }
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  setUserEmail(email: string | null): void {
    this.userEmail = email;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }
}
