import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacketDetail } from 'src/app/models/packets.model';
import { PacketService } from 'src/app/services/packet.service';

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

}
