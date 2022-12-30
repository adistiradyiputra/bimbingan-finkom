import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
@Component({
  selector: 'app-detail-history',
  templateUrl: './detail-history.page.html',
  styleUrls: ['./detail-history.page.scss'],
})
export class DetailHistoryPage implements OnInit {
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

  constructor(public modalCtrl: ModalController, private navParams: NavParams, private storage: Storage, private http: HttpClient) { }

  ngOnInit() {


//    this.getData();

    this.getcapture(this.kd_capture);
  }




 async getcapture(kd_capture) {
      let data: Observable<any>;
      data = this.http.get('http://bimbingan.api.unbin.ac.id/index.php/api/detailbimbim/'+ kd_capture );
      data.subscribe(result => {
        // this.arrayData = result;
        // for(let a of this.arrayData){
        //   console.log(a);
        // }
        this.kd_capture = result[0].kd_capture;
        this.kd_bimbingan = result[0].kd_bimbingan;
        this.keterangan = result[0].keterangan;
        this.images = result[0].photo;
        this.dentry = result[0].dentry;

        console.log(result[0].keterangan);
        console.log(result[0].photo);
        console.log(result[0].dentry);

      });
  }

  close() {
    this.modalCtrl.dismiss(null, 'Close');
  }
}
