import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  NavController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  results: any;
  nama: string;
  user_id: any;
  pass: string = '';
  qrdata: any;
  createCode: any;

  constructor( 
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  public create(){
    this.createCode = this.user_id;
  }

  displayToast(message) {
    this.toastCtrl
      .create({
        header: message,
        duration: 1000,
        position: 'top',
        color: 'danger',
      })
      .then((toast) => {
        toast.present();
      });
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      color: 'danger',
      position: 'top',
    });
    toast.present();
  }

  async login(input) {
    if (this.user_id === '') {
      this.presentToast('user_id cannot be empty!');
    } else if (this.pass === '') {
      this.presentToast('pass cannot be empty');
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      loader.present();
      const data = {
        user_id: this.user_id,
        pass: this.pass,
      };
      const header = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      };

      try {
       const storage = await this.storage.create();
        let data: Observable<any>;
        this.pass = input;
        const loading = await this.loadingCtrl.create({
          message: 'Loading...',
        });

        if (this.user_id === null && this.pass === null) {
        this.presentToast('Data tidak boleh ada yang kosong');
        } else {
        await loading.present();
        data = this.http.get(
        ' http://bimbingan.api.unbin.ac.id/index.php/api/login/' +
          this.user_id +
          '/' +
          this.pass
        );
        data
        .pipe(
          finalize(() => {
            loading.dismiss();
          })
        )
        .subscribe( async ( result) => {
          this.results = result;
         
          if (this.results.status === 'Ok') {
            // this.router.navigate(['tabs/tab1', {data: this.input_b}]);
            await this.storage.set('isLoggedIn', this.results.result[0]);
                    localStorage.setItem('isLoggedIn', this.results.result[0]);
                    loader.dismiss();
            this.user_id = this.create();
            this.navCtrl.navigateRoot(['tabs/tab1']);
            this.pass = null;
            // console.log(this.results)
          } else {
            loader.dismiss();
            this.presentToast('Please Check user_id and pass correctly');
          }
        });  }
      } catch (err) {
          loader.dismiss();
          this.presentToast('Something went wrong!');
        }
      }
      }

}
