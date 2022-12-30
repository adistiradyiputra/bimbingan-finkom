import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DetailHistoryPage } from '../detail-history/detail-history.page';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-popup-component',
  templateUrl: './popup-component.page.html',
  styleUrls: ['./popup-component.page.scss'],
})
export class PopupComponentPage implements OnInit {
  public arrayData: any;
  unbinData: any;
  public nama: string;
  results: any;
  npm: any;
  kd_bimbingan: any;
  judul: string;
  topik: string;
  dospem: string;
  thn_akademik: any;
  images: any;
  keterangan: string;
  dentry: any;
  kd_capture: any;
  
  constructor(public popoverController: PopoverController, 
    public modalCtrl: ModalController,
    private storage: Storage,
    private http: HttpClient) { }

  ngOnInit() {
  }

  close(){
    this.popoverController.dismiss();
  }


  async showModal() {
    const modal = await this.modalCtrl.create({
      component: DetailHistoryPage,
      mode: 'ios'
    });
    return await modal.present();
    
  }
}