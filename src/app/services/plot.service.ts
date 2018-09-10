import { EventEmitter, Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlotService {
  public apiURL: string = 'http://104.248.29.132:8080/data';
  constructor() {
  }


  public getObservable (currencyCode: string) {
    let lastSecondsToCheck = 3600;
    let dataGetter =  function sequenceSubscriber(observer) {

      function startEmmiting() {

        async function _getDayBlocks() {
          let toTime = Math.round(new Date().getTime() / 1000);
          const response = axios.get(
            'http://104.248.29.132:8080/data' + '?currency=' + currencyCode + '&last=' + lastSecondsToCheck);

          console.log('http://104.248.29.132:8080/data' + '?currency=' + currencyCode + '&last=' + lastSecondsToCheck);
          return response || 0;
        }

        _getDayBlocks().then(response => {
          let resp = [];
          resp = response['data'];
          if(resp.length > 0) {
            observer.next(resp);
          }
        }).catch(err => console.dir(err));
      }
      startEmmiting();
      setInterval(startEmmiting, 5000);
      /*let timeToCheckAtLaunch;
      switch (currencyCode) {
        case 'btc':
          timeToCheckAtLaunch = 15*3600;
          break;
        case 'eth':
          timeToCheckAtLaunch = 15*60;
          break;
        case 'bch':
          timeToCheckAtLaunch = 15*3600;
          break;
        case 'btg':
          timeToCheckAtLaunch = 15*3600;
          break;
        case 'ltc':
          timeToCheckAtLaunch = 15*60;
          break;
        default:
          timeToCheckAtLaunch = 15*3600;
      }
      let firstResponse = axios.get(
        'http://104.248.29.132:8080/data' + '?currency=' + currencyCode + '&last=' + timeToCheckAtLaunch);
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');
      console.log(firstResponse);*/


    }

    return new Observable(dataGetter);
  }

}
