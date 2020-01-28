import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { FixedComponent } from 'src/app/components/fixed/fixed.component';
import { RandomComponent } from 'src/app/components/random/random.component';
import { NodeComponent } from 'src/app/components/node/node.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  declarations: [HomePage, RandomComponent, FixedComponent, NodeComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
})
export class HomeModule { }
