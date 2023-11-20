import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEmail: string = '';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  async createUserProfileIfNotExist(userEmail: string): Promise<void> {
    const userRef = this.firestore.doc<User>(`users/${userEmail}`);
    const userDoc = await firstValueFrom(userRef.get());

    if (!userDoc.exists) {
      // El documento no existe, crea un perfil inicial
      const initialUserProfile: User = {
        apodo: '',
        desc: '',
        userPhotos: [],
        petPhotos: []
      };

      try {
        await userRef.set(initialUserProfile);
      } catch (error) {
        console.error('Error al crear el perfil del usuario:', error);
      }
    }
  }

  getUserProfile(): Observable<User | undefined> {
    return this.firestore.doc<User>(`users/${this.userEmail}`).valueChanges();
  }

  updateUserProfile(nickname: string, description: string): Promise<void> {
    return this.firestore.doc(`users/${this.userEmail}`).update({
      apodo: nickname,
      desc: description
    });
  }

   uploadPhoto(file: File, path: string): Observable<string> {
    const filePath = `${path}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    console.log("va")
    return task.snapshotChanges().pipe(
      switchMap(() => {
        const downloadUrl$ = fileRef.getDownloadURL();
        downloadUrl$.subscribe((url) => {
          console.log('URL de descarga:', url); // Muestra la URL en la consola
        });
        return downloadUrl$;
      })
    );
}


  deletePhoto(photoUrl: string): Promise<void> {
    const photoRef = this.storage.refFromURL(photoUrl);
    return firstValueFrom(photoRef.delete());
  }

  addPhotoToProfile(photoUrl: string, photoType: 'userPhotos' | 'petPhotos'): Promise<void> {
    const userRef = this.firestore.doc(`users/${this.userEmail}`);
    const updateObj: { [key: string]: any } = {}; // Define un objeto con índices de tipo string
    
    // Usar photoType como índice
    updateObj[photoType] = firebase.firestore.FieldValue.arrayUnion(photoUrl);
    
    return userRef.update(updateObj);
  }
  
  removePhotoFromProfile(photoUrl: string, photoType: 'userPhotos' | 'petPhotos'): Promise<void> {
    const userRef = this.firestore.doc(`users/${this.userEmail}`);
    const updateObj: { [key: string]: any } = {}; // Define un objeto con índices de tipo string
    
    // Usar photoType como índice
    updateObj[photoType] = firebase.firestore.FieldValue.arrayRemove(photoUrl);
    
    return userRef.update(updateObj);
  }
}  