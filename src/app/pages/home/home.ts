import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PacketService } from 'src/app/services/packet.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage {

  public randomActive: boolean = true;
  public fixedActive: boolean = false;
  public nodeActive: boolean = false;

  constructor(public navCtrl: NavController, public packetService: PacketService) {
  }

  showRandom() {
    this.randomActive = true;
    this.fixedActive = false;
    this.nodeActive = false;
  }

  showFixed() {
    this.randomActive = false;
    this.fixedActive = true;
    this.nodeActive = false;
  }

  showNode() {
    this.randomActive = false;
    this.fixedActive = false;
    this.nodeActive = true;
  }
}
