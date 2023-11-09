import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

interface Pet {
  id: number;
  name: string;
  photos: string[];
  description: string;
  photoIndex: number;
  flipped: boolean; // Esta propiedad indica si la tarjeta está volteada
}

@Component({
  selector: 'app-pet-tab',
  templateUrl: './pet-tab.page.html',
  styleUrls: ['./pet-tab.page.scss'],
})
export class PetTabPage implements OnInit {
  pets: Pet[] = [
    {
      id: 1,
    name: 'Fido',
    photos: ['../../../assets/perro.png', '../../../assets/perro.png'],
    description: 'Fido es un perro juguetón y amigable.',
    photoIndex: 0,
    flipped: false, 
    },
    // ... más mascotas
  ];
  constructor() { }

  ngOnInit() {
    
  }
  flipCard(pet: Pet): void {
    pet.flipped = !pet.flipped; // Esto alternará el estado de la tarjeta
  }
  changePhoto(pet: Pet, direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      pet.photoIndex = (pet.photoIndex + 1) % pet.photos.length;
    } else if (direction === 'prev') {
      pet.photoIndex = (pet.photoIndex - 1 + pet.photos.length) % pet.photos.length;
    }
  }
  
  like(pet: any) {
    // Lógica para manejar el "like" aquí
    console.log('Liked', pet);
  }

  dislike(pet: any) {
    // Lógica para manejar el "dislike" aquí
    console.log('Disliked', pet);
  }
}
