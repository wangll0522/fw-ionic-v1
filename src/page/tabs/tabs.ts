import {Component, ViewChild} from '@angular/core';
import { IndexTab, ProfileTab, NewsTab } from '../pageinfo';
import {TranslateService} from "@ngx-translate/core";
import {Platform, Config} from "ionic-angular";
import {Settings} from "../../providers/settings";
import {SplashScreen} from "@ionic-native/splash-screen";
import { StatusBar } from '@ionic-native/status-bar';
import {Tabs} from "ionic-angular";


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'index-tabs',
  templateUrl: 'tabs.html'
})
export class MainTabsPage {

  @ViewChild('mainTabs') tabs:Tabs;
  indexRoot: any = IndexTab;
  newsRoot: any = NewsTab;
  profileRoot: any = ProfileTab;

  tab1Title = "首页";
  tab2Title = "资讯";
  tab3Title = "我的";

  constructor(private translate: TranslateService, private platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    translate.get(['首页', '资讯', '我的']).subscribe(values => {
      this.tab1Title = values['首页'];
      this.tab2Title = values['资讯'];
      this.tab3Title = values['我的'];
    });

    this.initTranslate();
  }


  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('cn');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('cn'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }


}
