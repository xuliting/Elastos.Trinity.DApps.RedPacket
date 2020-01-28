import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { PacketService } from 'src/app/services/packet.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {

  // Must
  public publicKey: string = "";
  public ela: number;
  public packets: number;
  public name: string = "";
  public creatingPacket: boolean = false;

  // Optional
  public note: string = "";
  public addresses: string[] = [];

  constructor(
    public packetService: PacketService,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.creatingPacket = false;
  }

  selectChanged(event) {
    console.log(event);
    this.publicKey = event.detail.value;
    console.log(this.publicKey);
  }

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

  /** Submit packet form **/
  createPacket() {
    this.addresses = this.addresses.filter(Boolean);
    console.log('Addresses', this.addresses);

    if(this.publicKey && this.name && this.ela > 0 && this.packets > 0) {
      this.creatingPacket = true;

      this.packetService.createPacket({
        packet_num: this.packets,
        packet_amt: this.ela,
        packet_allowed_rcv_addrs: this.addresses.length > 0 ? this.addresses : [],
        packet_type: 2,
        super_node_owner_public_key: this.publicKey,
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
