import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { Packet, PacketDetail } from '../models/packets.model';
import { Platform } from '@ionic/angular';

declare let appManager: AppManagerPlugin.AppManager;
let managerService: any;

@Injectable({
  providedIn: 'root'
})
export class PacketService {

  private nodeApi: string = 'https://node1.elaphant.app/api';
  private packetApi: string = 'https://redpacket.elastos.org/api/v1/packet/';
  public _nodes: Node[] = [];

  private handledIntentId: Number;

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private router: Router,
  ) { }

  async init() {
    if(this.platform.platforms().indexOf("cordova") >= 0) {
      console.log("Listening to intent events")
      appManager.setIntentListener(
        this.onReceiveIntent
      );
    }

    const height: number = await this.fetchCurrentHeight();
    this.fetchNodes(height);
  }

  onReceiveIntent = (ret) => {
    console.log("Intent received", ret);

    switch (ret.action) {
      case "gradredpacket":
        console.log('Intent recieved', ret);

        this.handledIntentId = ret.intentId;
        this.directToGrab(ret.params);
    }
  }

  directToGrab(params) {
    let props: NavigationExtras = {
      queryParams: {
        hash: params.packet,
        // name: params.name,
      }
    }
    this.router.navigate(['/menu/search'], props);
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
      this.http.post<any>(this.packetApi + 'create', packet).subscribe((res) => {
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
        // this.router.navigate(['packet-created'], props)
        this.router.navigate(['menu/packet-created'], props)
      }, (err) => {
        console.log(err);
        resolve(false);
      });
    });
  }

  minimizeApp() {
    appManager.launcher();
  }

  closeApp() {
    appManager.close();
  }

  // ex: 1273012468890214
  // ex: 1779487419459895
  peakPacket(hash: string): Promise<any> {
    console.log('Checking packet', hash);
    return new Promise((resolve, reject) => {
      this.http.get<any>(
        this.packetApi + 'peek/' +
        `${'?packet_hash=' + hash + '&show_receivers=true'}`
      ).subscribe((res) => {
        console.log(res);
        resolve(res.result.packet_detail);
      }, (err) => {
        console.log(err);
        resolve();
      });
    });
  }

  grabPacket(hash: string, address: string, name: string): Promise<any> {
    console.log('Grabbing packet', hash, address, name);
    return new Promise((resolve, reject) => {
      this.http.get<any>(
        this.packetApi + 'grab/' +
        `${'?packet_hash=' + hash + '&address=' + address + '&name=' + name }`
      ).subscribe((res) => {
        console.log(res);
        if(res.status === 200) {
          resolve(res);
        } else {
          resolve();
        }
      }, (err) => {
        resolve();
      });
    });
  }
}
