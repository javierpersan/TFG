import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
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
      // Autenticación para Android
      // (usa el método que describimos anteriormente para Android)
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
      this.router.navigate(['tab2']);  // Redireccionamos al usuario a la página 'home'
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
