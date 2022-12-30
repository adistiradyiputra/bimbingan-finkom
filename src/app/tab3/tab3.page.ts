import { PopupComponentPage } from './../popup-component/popup-component.page';
import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { DetailHistoryPage } from '../detail-history/detail-history.page';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public arrayData: any;
  unbinData: any;
  public nama: string;
  user_id: any
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
  ctype: any;


  constructor(
    public popoverController: PopoverController,
    private http: HttpClient,
    private storage: Storage,
    private modalCtrl: ModalController
    ) {

      this.getskripsi();

    }
  
    async presentPopover(ev: any){
      const popover = await this.popoverController.create({
        component: PopupComponentPage,
        event: ev,
        mode: 'ios',
        translucent: true,
      });
      await popover.present();
      const {role} = await popover.onDidDismiss();
    }

  getskripsi(){
    this.storage.get('isLoggedIn').then(val => {
      console.log(val.userid)
      let data: Observable<any>;
      if(this.ctype === "skripsi"){
        data = this.http.get('http://bimbingan.api.unbin.ac.id/index.php/api/getbyskripsi/'+ val.userid);
        data.subscribe(result => {
          // console.log(result[0])
          this.arrayData = result;
          for(let a of this.arrayData){
            console.log(a);
          }
          //  console.log(this.arrayData)
          // this.npm = result;
          this.kd_capture = result.kd_capture;
          this.user_id = result.userid;
          this.kd_bimbingan = result.kd_bimbingan;
          this.judul = result.judul;
          this.topik = result.topik;
          this.ctype = result.ctype;
          this.dospem = result.dospem;
          this.thn_akademik = result.thn_akademik;
        });  
      }else{
        if(this.ctype === "proposal"){
          data = this.http.get('http://bimbingan.api.unbin.ac.id/index.php/api/getbyproposal/'+ val.userid);
          data.subscribe(result => {
            // console.log(result[0])
            this.arrayData = result;
            for(let a of this.arrayData){
              console.log(a);
            }
            //  console.log(this.arrayData)
            // this.npm = result;
            this.kd_capture = result.kd_capture;
            this.user_id = result.userid;
            this.kd_bimbingan = result.kd_bimbingan;
            this.judul = result.judul;
            this.topik = result.topik;
            this.ctype = result.ctype;
            this.dospem = result.dospem;
            this.thn_akademik = result.thn_akademik;
          });  
        }
      }
    })
  }

  async get(kd_capture) {
    console.log(kd_capture);
    const modal = await this.modalCtrl.create({
      component: DetailHistoryPage,
      componentProps: {
        "kd_capture": kd_capture
        
        
      }
    });
    return await modal.present();
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      if(this.ctype === "proposal"){
        this.getskripsi()
      }else{
        if(this.ctype === "skripsi"){
          this.getskripsi()
        }       
      }
    }, 2000);
  };
  }


