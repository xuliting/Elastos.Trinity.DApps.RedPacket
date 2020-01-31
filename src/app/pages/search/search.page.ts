import { Component, OnInit } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public peekActive: boolean = true;
  public grabActive: boolean = false;

  constructor(public packetService: PacketService) { }

  ngOnInit() {
  }

  showPeek() {
    this.peekActive = true;
    this.grabActive = false;
  }

  showGrab() {
    this.peekActive = false;
    this.grabActive = true;
  }
}
