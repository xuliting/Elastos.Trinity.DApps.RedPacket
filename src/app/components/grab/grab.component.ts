import { Component, OnInit, Input } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-grab',
  templateUrl: './grab.component.html',
  styleUrls: ['./grab.component.scss'],
})
export class GrabComponent implements OnInit {

  @Input() public hash: string = '';
  public address: string = '';
  public name: string = '';
  public grabbingPacket: boolean = false;
  public packetOpened: boolean = false;

  constructor(
    public packetService: PacketService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.hash);
  }

  searchPacket() {
    if(this.hash && this.address && this.name) {
      this.grabbingPacket = true;
      this.packetService.grabPacket(this.hash, this.address, this.name).then((res) => {
        this.grabbingPacket = false;

        if(res) {
          console.log(res);

          if(res.result.desc === 'Normal') {
            this.packetOpened = true;
            // this.toastSuccess(res.result.amount)
            this.alertSuccess(res.result.amount);
          } else {
            // this.toastFail()
            this.alertFail();
          }

        } else {
          this.toastErr();
        }
      });
    }
  };

  /**************** Toast Option ****************/
  async toastSuccess(ela: number) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'danger',
      header: 'Congrats, ' + 'you claimed ' + ela + ' ELA!',
      message: 'If this red packet is charged, you should see your new balance once confirmed!',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'Cool!',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  async toastFail() {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'danger',
      header: 'Sorry!',
      message: 'Looks like you are too late or forbidden to open this red packet..',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'Not cool!',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  async toastErr() {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'danger',
      header: 'Form is incorrect',
      message: 'Please check the hash and address before submitting again',
      duration: 4000
    });
    toast.present();
  }

  /**************** Alert Option ****************/
  async alertSuccess(ela: number) {
    const toast = await this.alertController.create({
      mode: 'ios',
      header: 'Congrats, ' + 'you claimed ' + ela + ' ELA!',
      message: 'If this red packet is charged, you should see your new balance once confirmed!',
      buttons: [
        {
          text: 'Cool!',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  async alertFail() {
    const toast = await this.alertController.create({
      mode: 'ios',
      header: 'Sorry!',
      message: 'Looks like you are too late or forbidden to open this red packet..',
      buttons: [
        {
          text: 'Not cool!',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }
}