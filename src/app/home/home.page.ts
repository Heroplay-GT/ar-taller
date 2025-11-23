import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {

  markers = [
    {
      name: 'Marker Hiro (por defecto)',
      url: 'assets/markers/hiro.patt'
    },
    // Ejemplo de segundo marker (no agregado al proyecto)
    // {
    //   name: 'Marker Kanji',
    //   url: 'assets/markers/kanji.patt'
    // }
  ];

  selectedMarkerUrl = this.markers[0].url;

  constructor(private router: Router) {}

  goToAR() {
    this.router.navigate(['/ar'], {
      queryParams: { marker: this.selectedMarkerUrl }
    });
  }
}
