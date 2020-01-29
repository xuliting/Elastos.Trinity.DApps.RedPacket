import { Component, OnInit } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';

@Component({
  selector: 'app-grab',
  templateUrl: './grab.page.html',
  styleUrls: ['./grab.page.scss'],
})
export class GrabPage implements OnInit {

  constructor(public packetService: PacketService) { }

  ngOnInit() {
  }

}
