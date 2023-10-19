import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.page.html',
  styleUrls: ['./chat-tab.page.scss'],
})
export class ChatTabPage implements OnInit {
  ionViewWillEnter() {
    this.animateTab();
  }
  
  constructor() { }

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
