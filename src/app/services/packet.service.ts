import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

import { Packet } from '../models/packets.model';

@Injectable({
  providedIn: 'root'
})
export class PacketService {

  private nodeApi: string = 'https://node1.elaphant.app/api';
  private packetApi: string = 'https://redpacket.elastos.org/api/v1/packet/create';
  public _nodes: Node[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  async init() {
    const height: number = await this.fetchCurrentHeight();
    this.fetchNodes(height);
  }

  fetchCurrentHeight(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.nodeApi + '/1/currHeight').subscribe((res) => {
        resolve(res.result);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  fetchNodes(height: number) {
    console.log('Fetching Nodes..');
    this.http.get<any>(this.nodeApi + '/v1/dpos/rank/height/' + height).subscribe((res) => {
      console.log('Nodes Fetch Response', res)
      this._nodes = this._nodes.concat(res.result);
      console.log('Nodes Added..', this._nodes);
    });
  }

  createPacket(packet: Packet): Promise<boolean> {
    console.log('Creating packet', packet);

    return new Promise((resolve, reject) => {
      this.http.post<any>(this.packetApi, packet).subscribe((res) => {
        console.log(res);
        resolve(false);
        let props: NavigationExtras = {
          queryParams: {
            hash: res.result.packet_hash,
            payAddress: res.result.pay_address,
            ela: packet.packet_amt,
            packets: packet.packet_num,
            beneficiaries: packet.packet_allowed_rcv_addrs,
          }
        }
        this.router.navigate(['packet-created'], props)
      }, (err) => {
        console.log(err);
        resolve(false);
      });
    });
  }
}
