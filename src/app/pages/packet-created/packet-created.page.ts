import { Component, OnInit } from '@angular/core';
import { PacketService } from 'src/app/services/packet.service';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

@Component({
  selector: 'app-packet-created',
  templateUrl: './packet-created.page.html',
  styleUrls: ['./packet-created.page.scss'],
})
export class PacketCreatedPage implements OnInit {

  public hash: string = "";
  public payAddress: string = "";
  public packetType: string = "";
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
        this.packetType = params.packetType,
        this.ela = params.ela,
        this.packets = params.packets,
        this.beneficiaries = params.beneficiaries
      }
    });
  }

  ionViewDidEnter() {
    appManager.setVisible("show");

    titleBarManager.setTitle("Success!");
    titleBarManager.setNavigationMode(TitleBarPlugin.TitleBarNavigationMode.CLOSE);
    titleBarManager.setBackgroundColor("#f04141");
    titleBarManager.setForegroundMode(TitleBarPlugin.TitleBarForegroundMode.LIGHT);
  }

  copy(type: string) {
    this.copied = true;
    if(type === 'address') {
      this.clipboard.copy(this.payAddress);
      this.copyToast(type, this.payAddress)
    } else if(type === 'hash') {
      this.clipboard.copy(this.hash);
      this.copyToast(type, this.hash)
    } else {
      this.clipboard.copy('https://scheme.elastos.org/grabredpacket?packet=' + this.hash);
      this.copyToast(type, 'https://scheme.elastos.org/grabredpacket?packet=' + this.hash);
    }
  }

  pay() {
    appManager.sendIntent(
      'pay',
      {
        receiver: this.payAddress,
        amount: this.ela,
        memo: null,
      },
      {},
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
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
