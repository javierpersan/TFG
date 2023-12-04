import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from '../app/FirebaseConfig';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule,MatButtonModule,MatCardModule,BrowserModule,AngularFireModule.initializeApp(firebaseConfig), IonicModule.forRoot(),provideAuth(() => getAuth()), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports: [MatButtonModule,MatCardModule]
})
export class AppModule {}
