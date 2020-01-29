import { Component, OnInit } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';

@Component({
  selector: 'app-peek',
  templateUrl: './peek.page.html',
  styleUrls: ['./peek.page.scss'],
})
export class PeekPage implements OnInit {

  constructor(public packetService: PacketService) { }

  ngOnInit() {
  }

}
