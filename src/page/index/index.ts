import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {PageWelcome,PageBusLine} from '../pageinfo'
import {IndexApi} from "./index.api"

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {
  constructor(public navCtrl: NavController, private app: App, private indexApi: IndexApi) { }
  portalMenu: any[] =[
    [{ title: '公交', icon: 'ionitron', color:"primary", component: PageWelcome },
    { title: '自行车', icon: 'ionitron', color:"primary", component: PageBusLine },
    { title: '实时路况', icon: 'ionitron', color:"primary", component: null },
    { title: '停车位', icon: 'ionitron', color:"primary", component: null }],
    [{ title: '一键召车', icon: 'ionitron', color:"primary", component: null },
    { title: '汽车票', icon: 'ionitron', color:"primary", component: null },
    { title: '火车票', icon: 'ionitron', color:"primary", component: null },
    { title: '更多', icon: 'ionitron', color:"primary", component: null }]
  ]

  openPage(page) {
    this.app.getActiveNav().push(page.component);
  }
  getPortalModel() {
    this.indexApi.models().subscribe((resp)=>{
      //做相应的操作
    }, (error) => {

    });
  }
}
