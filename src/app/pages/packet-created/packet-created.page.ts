import { Component, OnInit } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';

declare let appManager: any;

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
  public copied: boolean = false;

  constructor(
    public packetService: PacketService,
    private route: ActivatedRoute,
    private clipboard: Clipboard,
    private toastController: ToastController
  ) { }

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

  copy(type: string) {
    if(type === 'address') {
      this.copied = true;
      this.clipboard.copy(this.payAddress);
      this.copyToast(type, this.payAddress)
    } else {
      this.clipboard.copy(this.hash);
      this.copyToast(type, this.hash)
    }
  }

  async copyToast(type: string, value: any) {
    console.log(type, value);
    const toast = await this.toastController.create({
      mode: 'ios',
      color: 'danger',
      header: 'Copied ' + type,
      message: value,
      duration: 2000
    });
    toast.present();
  }

  openApp() {
    appManager.start("org.elastos.trinity.dapp.wallet");
  }

  closeApp() {
    appManager.close();
  }
}
