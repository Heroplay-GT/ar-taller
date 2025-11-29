import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarkerConfigPageRoutingModule } from './marker-config-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarkerConfigPageRoutingModule
  ]
})
export class MarkerConfigPageModule {}
