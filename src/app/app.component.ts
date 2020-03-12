import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PacketService } from './services/packet.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, packetService: PacketService, navController: NavController) {
    platform.ready().then(() => {
      packetService.init();
      statusBar.styleDefault();
      splashScreen.hide();
      
      navController.navigateRoot("/home");
    });
  }
}
