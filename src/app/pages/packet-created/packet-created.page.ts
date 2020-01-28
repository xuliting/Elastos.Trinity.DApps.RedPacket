import { Component, OnInit } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-packet-created',
  templateUrl: './packet-created.page.html',
  styleUrls: ['./packet-created.page.scss'],
})
export class PacketCreatedPage implements OnInit {

  public hash: string = "";
  public payAddress: string = "";
  public ela: number = null;
  public packets: number = null;
  public beneficiaries: string[] = [];

  constructor(public packetService: PacketService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.hash = params.hash,
        this.payAddress = params.payAddress,
        this.ela = params.ela,
        this.packets = params.packets,
        this.beneficiaries = params.beneficiaries
      }
    });
  }
}
