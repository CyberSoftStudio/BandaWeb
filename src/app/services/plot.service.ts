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

  public getObservable(currencyCode: string) {
    const lastSecondsToCheck = 3600;
    const dataGetter = function sequenceSubscriber(observer) {

      function startEmmiting() {

        async function _getDayBlocks() {
          const toTime = Math.round(new Date().getTime() / 1000);
          const response = axios.get(
            'http://104.248.29.132:8080/data' + '?currency=' + currencyCode + '&last=' + lastSecondsToCheck);

          console.log('http://104.248.29.132:8080/data' + '?currency=' + currencyCode + '&last=' + lastSecondsToCheck);
          return response || 0;
        }

        _getDayBlocks().then(response => {
          let resp = [];
          resp = response['data'];
          if (resp.length > 0) {
            observer.next(resp);
          }
        }).catch(err => console.dir(err));
      }

      startEmmiting();
      setInterval(startEmmiting, 5000);
    };

    return new Observable(dataGetter);
  }
}

