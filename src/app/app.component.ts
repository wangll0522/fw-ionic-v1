import { Component, ViewChild } from '@angular/core';
import {Platform, Config, Keyboard, ToastController, IonicApp, Nav} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MainTabsPage} from '../page/tabs/tabs'

import { TranslateService } from '@ngx-translate/core'

@Component({
  template: `
    <ion-nav #rootNav [root]="rootPage"></ion-nav>`
})

export class RootApp {

  rootPage = MainTabsPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('rootNav') nav: Nav;

  constructor(public ionicApp: IonicApp, private translate: TranslateService, public platform: Platform, public toastCtrl: ToastController,
              private statusBar: StatusBar, private splashScreen: SplashScreen, private keybord: Keyboard,private config: Config) {
    this.ionViewDidLoad();
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      if (this.keybord.isOpen()) {
        this.keybord.close();
        return;
      }
      //点击返回按钮隐藏toast或loading或Overlay
      this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();

      if (activePortal) {
        activePortal.dismiss().catch(() => {});
        activePortal.onDidDismiss(() => {});
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('zh');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('zh'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.registerBackButtonAction();//注册返回按键事件
    });
  }


}
