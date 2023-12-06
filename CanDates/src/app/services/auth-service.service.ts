import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmail: string | null = null;

  constructor(private userService: UserService, private auth: Auth, private platform: Platform, private router: Router) { }

  async registerWithEmail(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userEmail = userCredential.user?.email;

      if (userEmail) {
        this.userService.setUserEmail(userEmail);
        this.router.navigate(['home']);
        console.log('User registered with email!');
      }
    } catch (error) {
      console.error('Error registering with email:', error);
    }
  }

  async loginWithGoogle(): Promise<void> {
    let userCredential;

    try {
        userCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        const userEmail = userCredential.user?.email;

        if (userEmail) {
            this.userService.setUserEmail(userEmail);

            // Verifica si el perfil del usuario existe, si no, créalo
            await this.userService.createUserProfileIfNotExist(userEmail);        }

        this.router.navigate(['home']);
        console.log('User logged in with Google!');
    } catch (error) {
        console.error('Error logging in with Google:', error);
        return;
    }

    // Si la autenticación fue exitosa, obtenemos el correo electrónico y lo almacenamos en el servicio
    if (userCredential && userCredential.user && userCredential.user.email) {
        this.setUserEmail(userCredential.user.email);
    } else {
        console.error('No se pudo obtener el correo electrónico del usuario.');
    }
}

async loginWithEmail(email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const userEmail = userCredential.user?.email;

    if (userEmail) {
      this.userService.setUserEmail(userEmail);
      this.router.navigate(['home']);
      console.log('User logged in with email!');
    }
  } catch (error) {
    console.error('Error logging in with email:', error);
  }
}
  setUserEmail(email: string | null): void {
    this.userEmail = email;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }
}
