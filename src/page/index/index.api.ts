/**
 * Created by mac-pc on 2017/6/9.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from '../../providers/api';
import { Settings } from '../../providers/settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IndexApi {
  private userInfo : any;
  constructor(public http: Http, public api: Api, public setting: Settings) {
    if (setting.hasOwnProperty("userInfo")) {
      this.userInfo = setting.getValue("userInfo") || {};
    }

  }

  /**
   * 获取首页功能模块
   * @returns {Observable<T>}
   */
  models() {
    let seq = this.api.post('models/getByAccount', this.userInfo.account).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        if (res.status == 'success') {

        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

}
