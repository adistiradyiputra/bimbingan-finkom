import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import {
  NavController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  data = [];

  features: any[] = [
    {id: 1, background: 'rgba(255, 196, 9, 0.1)', page: ''}
  ];

  transactions: any[] = [
    {id: 1, vendor: 'Received from PhonePe', image: '', amount: 1500, time: '3:00PM'},
    {id: 2, vendor: 'Flaticons', image: '', amount: -1200, time: '4:00PM'}
  ];

  kd_bimbingan: any;
  user_id: any;
  results: any;
  nama: string;
  npm: any;
  password: string = '';
  qrdata: any;
  createCode: any;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private http: HttpClient

  ) {

//  this.getname();
    this.create();

    

    setTimeout(() => {
      this.data.push({
        prodi: "Teknik Informatika",
        npm: this.npm,
      });
    }, 2000);
  }

  public create(){
    this.storage.get('isLoggedIn').then(val => {
     this.npm = val.userid
     this.nama = val.nama
     this.createCode = val.userid
     console.log(this.npm)
     console.log(this.nama)
    });
      
  }


  

  

  
  

  logout() {
    this.storage.clear();
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }

}
