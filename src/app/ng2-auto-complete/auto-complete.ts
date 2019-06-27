import { Response } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LabApiHttp } from '../auth/api-http.service';

/**
 * provides auto-complete related utility functions
 */
@Injectable()
export class AutoComplete {

  public source: string;
  public pathToData: string;

  constructor(private apiHttp: LabApiHttp) {
    // ...
  }

  filter(list: any[], keyword: string) {
    return list.filter(
      el => {
        return !!JSON.stringify(el).match(new RegExp(keyword, 'i'));
      }
    );
  }

  /**
   * return remote data from the given source and options, and data path
   *
   * @param {*} options is an object containing the query paramters for the GET call
   * @returns {Observable<Response>}
   *
   * @memberOf AutoComplete
   */
  getRemoteData(options: any): Observable<Response> {

    const keyValues: any[] = [];
    let url = '';

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        // replace all keyword to value
        const regexp: RegExp = new RegExp(':' + key, 'g');

        url = this.source;
        if (url.match(regexp)) {
          url = url.replace(regexp, options[key]);
        } else {
          keyValues.push(key + '=' + options[key]);
        }
      }
    }

    if (keyValues.length) {
      const qs = keyValues.join('&');
      url += url.match(/\?[a-z]/i) ? qs : ('?' + qs);
    }

    return this.apiHttp.get(url)
      .pipe(map(resp => resp.json()))
      .pipe(map(resp => {
        let list = resp.data || resp;
        if (this.pathToData) {
          const paths = this.pathToData.split('.');
          paths.forEach(prop => list = list[prop]);
        }

        return list;
      }));
  };
}

