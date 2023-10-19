import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.page.html',
  styleUrls: ['./user-tab.page.scss'],
})
export class UserTabPage implements OnInit {

  constructor() { }
  ionViewWillEnter() {
    this.animateTab();
  }
  
  ngOnInit() {
    this.animateTab();

  }
  animateTab() {
    const tabContent = document.querySelector('.content-class'); // Asegúrate de seleccionar el elemento correcto.
    gsap.from(tabContent, {
      x: '-100%',
      duration: 1,
      ease: 'power3.out',
      stagger: {
        amount: 0.3
      }
    });
  }

}
