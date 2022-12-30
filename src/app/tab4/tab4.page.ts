import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  id: any;
  kd_informasi: any;
  thn_akademik_setting: any;
  thn_akademik_informasi: any;
  proposal: any;
  skripsi: any;
  dentry: any;
  arrayData: any;

  constructor(
    private storage: Storage,
    private http: HttpClient,
  ) { }

  ngOnInit() {

    this.getinfo();
  //  this.getsetting()
  }

  getinfo() {
  
    let data: Observable<any>;
    data = this.http.get('http://bimbingan.api.unbin.ac.id/index.php/api/info_finkom');
    data.subscribe(result => {
      
      this.arrayData = result;
        for(let a of this.arrayData){
          console.log(a);
        }
      this.kd_informasi = result.kd_informasi;
      this.proposal = result.proposal;
      this.skripsi = result.skripsi;
      this.thn_akademik_informasi = result.thn_akademik;
      console.log(result.kd_informasi);
      console.log(result.proposal)
      console.log(result.skripsi)
      console.log(result.thn_akademik);
    });
}

// getsetting() {
//   let data: Observable<any>;
//   data = this.http.get('https://apikonseling.adistiradyiputra.my.id/api/getsetting/');
//   data.subscribe(result => {
//     this.id = result[0].id;
//     this.thn_akademik_setting = result[0].thn_akademik;
//     console.log(result[0].id);
//     console.log(result[0].thn_akademik);
//   });
// }

handleRefresh(event) {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
    this.getinfo();
  //  this.getsetting();
  }, 2000);
};
}