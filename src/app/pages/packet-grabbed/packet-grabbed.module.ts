import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PacketGrabbedPage } from './packet-grabbed.page';

const routes: Routes = [
  {
    path: '',
    component: PacketGrabbedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PacketGrabbedPage]
})
export class PacketGrabbedPageModule {}
