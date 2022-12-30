import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
  ) {

    
    this.initializeApp();
  }


  async initializeApp() {
    await this.storage.create();



    this.storage.get('isLoggedIn').then((val) => {
      if (val == null || val == undefined || val == '') {
        this.navCtrl.navigateRoot('/login');
      } else {
        this.navCtrl.navigateRoot('/tabs/tab1');
      }
    });
  }
  }

  
