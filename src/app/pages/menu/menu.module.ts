import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomeModule'},
      { path: 'search', loadChildren: '../search/search.module#SearchPageModule' },
      { path: 'packet-created', loadChildren: '../packet-created/packet-created.module#PacketCreatedPageModule' },
      { path: 'packet-grabbed', loadChildren: '../packet-grabbed/packet-grabbed.module#PacketGrabbedPageModule' },
    ]
  },
  {
    path: '',
    redirectTo: '/menu/home'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
