import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MarkerOption {
  id: string;
  label: string;
  type: 'preset' | 'pattern';
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  markers: MarkerOption[] = [
    {
      id: 'hiro',
      label: 'Marker Hiro (preset)',
      type: 'preset',
      value: 'hiro',
    },
    {
      id: 'kanji',
      label: 'Marker Kanji (preset)',
      type: 'preset',
      value: 'kanji',
    },
    {
      id: 'nvidia',
      label: 'Marker NVIDIA (custom)',
      type: 'pattern',
      value: 'assets/markers/pattern-Logo-NVIDIA.patt',
    },
  ];

  selectedMarkerId = this.markers[0].id;

  constructor(private router: Router) {}

  goToAR() {
    const marker = this.markers.find(m => m.id === this.selectedMarkerId);
    if (!marker) return;

    this.router.navigate(['/ar'], {
      queryParams: {
        type: marker.type,
        value: marker.value,
      },
    });
  }
}
