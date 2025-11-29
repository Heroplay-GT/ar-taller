import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkerConfigPage } from './marker-config.page';

const routes: Routes = [
  {
    path: '',
    component: MarkerConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarkerConfigPageRoutingModule {}
