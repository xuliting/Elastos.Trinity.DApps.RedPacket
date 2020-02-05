import { Component, OnInit } from '@angular/core';

declare let appManager: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    appManager.setVisible("show", ()=>{}, (err)=>{});
  }

  minimizeApp() {
    appManager.launcher();
  }

  closeApp() {
    appManager.close();
  }

}
