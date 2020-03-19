import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, IonRouterOutlet } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PacketService } from './services/packet.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(IonRouterOutlet, {static: true}) routerOutlet: IonRouterOutlet;
  
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, packetService: PacketService, navController: NavController) {
    platform.ready().then(() => {
      packetService.init();
      statusBar.styleDefault();
      splashScreen.hide();

      this.setupBackKeyNavigation();

      navController.navigateRoot("/home");
    });
  }

  /**
   * Listen to back key events. If the default router can go back, just go back.
   * Otherwise, exit the application.
   */
  setupBackKeyNavigation() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else {
        navigator['app'].exitApp();
      }
    });
  }
}
