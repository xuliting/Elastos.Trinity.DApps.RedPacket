import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/* With bottom tabs */
/* const routes: Routes = [
  { path: '', loadChildren: './pages/menu/menu.module#MenuPageModule'},
]; */

 /* Without bottom tabs */
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule'},
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'packet-created', loadChildren: './pages/packet-created/packet-created.module#PacketCreatedPageModule' },
  { path: 'packet-grabbed', loadChildren: './pages/packet-grabbed/packet-grabbed.module#PacketGrabbedPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
