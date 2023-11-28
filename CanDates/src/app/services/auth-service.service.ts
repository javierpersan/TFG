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
        await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
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
    await signInWithEmailAndPassword(this.auth, email, password);
    this.userService.setUserEmail(email); // Establece el correo electrónico en el servicio
    console.log('User logged in successfully!');
    this.router.navigate(['home']);
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
