import { Component, OnInit } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

declare let appManager: AppManagerPlugin.AppManager;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public peekActive: boolean = false;
  public grabActive: boolean = true;

  public hash: string = '';

  constructor(
    public packetService: PacketService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.hash) {
        this.hash = params.hash;
        this.showGrab();
        // this.toastReceived(params.name);
        this.alertReceived(params.hash);
      }
    });
  }

  ionViewDidEnter() {
    appManager.setVisible("show", ()=>{}, (err)=>{});
  }

  showPeek() {
    this.peekActive = true;
    this.grabActive = false;
  }

  showGrab() {
    this.peekActive = false;
    this.grabActive = true;
  }

  /**************** Toast Option ****************/
  async toastReceived(name: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'dark',
      header: 'You received a red packet from ' + name,
      message: 'Enter your address and name to claim it!',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'Okay',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  /**************** Alert Option ****************/
  async alertReceived(hash: string) {
    const toast = await this.alertController.create({
      mode: 'ios',
      header: 'You received a red packet!',
      subHeader: hash,
      message: 'Enter your address and name to claim it!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }
}
