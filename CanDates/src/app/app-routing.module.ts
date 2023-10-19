import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user-tab',
    loadChildren: () => import('./pages/user-tab/user-tab.module').then( m => m.UserTabPageModule)
  },
  {
    path: 'pet-tab',
    loadChildren: () => import('./pages/pet-tab/pet-tab.module').then( m => m.PetTabPageModule)
  },
  {
    path: 'chat-tab',
    loadChildren: () => import('./pages/chat-tab/chat-tab.module').then( m => m.ChatTabPageModule)
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
