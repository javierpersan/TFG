import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.interface';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.page.html',
  styleUrls: ['./user-tab.page.scss'],
})
export class UserTabPage implements OnInit {
  userEmail: string = '';
  userNickname: string = '';
  userDescription: string = '';
  userPhotos: string[] = [];
  petPhotos: string[] = [];

  constructor( private router: Router ,private cdr: ChangeDetectorRef,private userService: UserService) { }

  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe((user: User | undefined) => {
      if (user) {
        this.userNickname = user.apodo || '';
        this.userDescription = user.desc || '';
        this.userPhotos = user.userPhotos || [];
        this.petPhotos = user.petPhotos || [];
      }
    });
  }

  updateProfile() {
    this.userService.updateUserProfile(this.userNickname, this.userDescription).then(() => {
      console.log('Perfil actualizado con éxito');
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Error al actualizar el perfil:', error);
    });
  }

  async addUserPhoto(event: any) {
    console.log("ha ido ")
    try {
      const file = event.target.files[0];
      if (file) {
        const photoUrlObservable = this.userService.uploadPhoto(file, 'user-photos');
        photoUrlObservable.subscribe((photoUrl: string) => {
          this.userService.addPhotoToProfile(photoUrl, 'userPhotos').then(() => {
            this.loadUserProfile();
          }).catch(error => {
            console.error('Error al agregar la foto al perfil:', error);
          });
        });
      }
    } catch (error) {
      console.error('Error al subir la foto de usuario:', error);
    }
    this.cdr.detectChanges();
  }

  async addPetPhoto(event: any) {
    try {
      const file = event.target.files[0];
      if (file) {
        const photoUrlObservable = this.userService.uploadPhoto(file, 'pet-photos');
        photoUrlObservable.subscribe((photoUrl: string) => {
          this.userService.addPhotoToProfile(photoUrl, 'petPhotos').then(() => {
            this.loadUserProfile();
          }).catch(error => {
            console.error('Error al agregar la foto al perfil:', error);
          });
        });
      }
    } catch (error) {
      console.error('Error al subir la foto de mascota:', error);
    }
  }

  async deletePhoto(index: number, photoType: 'userPhotos' | 'petPhotos') {
    try {
      const photoUrl = photoType === 'userPhotos' ? this.userPhotos[index] : this.petPhotos[index];
      await this.userService.removePhotoFromProfile(photoUrl, photoType);
      this.loadUserProfile();
    } catch (error) {
      console.error('Error al eliminar la foto:', error);
    }
  }
}
