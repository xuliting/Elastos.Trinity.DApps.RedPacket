import { Component, OnInit } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';
import { PacketDetail } from 'src/app/models/packets.model';

@Component({
  selector: 'app-peek',
  templateUrl: './peek.component.html',
  styleUrls: ['./peek.component.scss'],
})
export class PeekComponent implements OnInit {

  public hash: string = '';
  public packet: PacketDetail;
  public seekingPacket: boolean = false;

  constructor(
    public packetService: PacketService,
    private toastController: ToastController,
    private clipboard: Clipboard
  ) { }

  ngOnInit() {}

  searchHash() {
    if(this.hash) {
      this.seekingPacket = true;
      this.packetService.peakPacket(this.hash).then((res) => {
        this.seekingPacket = false;
        if(res) {
          this.packet = res;
          console.log('Packet found', this.packet);
        } else {
          this.toastErr();
        }
      });
    }
  };

  getTime(timestamp: number) {
    return new Date(timestamp).toLocaleString();
  }

  getType(type: number) {
    if(type === 0) {
      return 'Random'
    } else if(type === 1) {
      return 'Fixed'
    } else {
      return 'Supernode'
    }
  }

  copy(hash: string) {
    this.clipboard.copy(hash);
    this.copyToast(hash);
  }

  async copyToast(hash: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'danger',
      header: 'Copied hash',
      message: hash,
      duration: 2000
    });
    toast.present();
  }

  async toastErr() {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'danger',
      header: 'Packet is invalid',
      message: 'Are you sure this is a correct hash?',
      duration: 4000
    });
    toast.present();
  }
}
