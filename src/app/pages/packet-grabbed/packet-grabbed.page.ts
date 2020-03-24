import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacketDetail } from 'src/app/models/packets.model';
import { PacketService } from 'src/app/services/packet.service';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

@Component({
  selector: 'app-packet-grabbed',
  templateUrl: './packet-grabbed.page.html',
  styleUrls: ['./packet-grabbed.page.scss'],
})
export class PacketGrabbedPage implements OnInit {

  public packet: PacketDetail;
  public ela: number = 0;

  constructor(
    private route: ActivatedRoute,
    public packetService: PacketService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.packet = JSON.parse(params.packet);
        this.ela = params.ela;
        console.log('Packet', this.packet);
        console.log('ELA Claimed', this.ela);
      }
    });
  }

  ionViewWillEnter() {
    titleBarManager.setTitle("Congrats!");
    titleBarManager.setNavigationMode(TitleBarPlugin.TitleBarNavigationMode.CLOSE);
    titleBarManager.setBackgroundColor("#f04141");
    titleBarManager.setForegroundMode(TitleBarPlugin.TitleBarForegroundMode.LIGHT);
  }

  ionViewDidEnter() {
    appManager.setVisible("show");
  }
}
