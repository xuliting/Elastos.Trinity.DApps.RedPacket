import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { PacketService } from 'src/app/services/packet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent implements OnInit {

  public ela: number;
  public packets: number;
  public name: string = "";
  public note: string = "";
  public addresses: string[] = [];
  public creatingPacket: boolean = false;

  constructor(
    public packetService: PacketService,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  /** For testing, to ensure list of addresses change correctly **/
  addressChanged(address: string) {
    console.log(this.addresses);
  }

  /** Add an extra address line **/
  addLine() {
    this.addresses.push("");
  }

  /** Track index of inputs as they change **/
  trackByFn(index: any, item: any) {
    return index;
  }

  validatePacket(form: NgForm) {

  }

  /** Submit packet form **/
  createPacket() {
    this.addresses = this.addresses.filter(Boolean);
    console.log('Addresses', this.addresses);

    if(this.name && this.ela > 0 && this.packets > 0) {
      this.creatingPacket = true;

      this.packetService.createPacket({
        packet_num: this.packets,
        packet_amt: this.ela,
        packet_allowed_rcv_addrs: this.addresses.length > 0 ? this.addresses : [],
        packet_type: 0,
        super_node_owner_public_key: null,
        packet_blessin: this.note,
        packet_creator: this.name,
        packet_end_timestamp: null,
        language: 'en_US'
      }).then((res) => {
        this.creatingPacket = res;
        console.log(this.creatingPacket);
      });

    } else {
      console.log('Form does not meet requirements');
      this.formErr();
    }
  }

  async formErr() {
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'danger',
      header: 'Form is incorrect',
      message: 'Please check your packet before submitting again',
      duration: 4000
    });
    toast.present();
  }
}
