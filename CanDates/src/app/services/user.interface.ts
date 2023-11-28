export interface User {
  email: string;      // Correo electrónico del usuario, usado como ID
  apodo: string;
  desc: string;
  userPhotos: string[]; // Arreglo de URLs de fotos de usuario
  petPhotos: string[]; // Arreglo de URLs de fotos de mascota
  likes: string[];
}
