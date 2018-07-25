import { Injectable } from '@angular/core';
import { ThumborOptions } from '@belisada/core/services/thumbor/thumbor.options';
import { Configuration } from '@belisada/core/config';

@Injectable({
  providedIn: 'root',
})
export class ThumborService {

  constructor(private configuration: Configuration) {

  }

  process(imageUrl, option: ThumborOptions) {
    let filtersUrl = 'filters:';
    Object.keys(option.filter).forEach(function(k) {
      filtersUrl += k + '(' + option.filter[k] + ')';
    });
    const size = option.width + 'x' + option.height + '/';
    const fit = option.fitting + '/';

    const finalUrl = this.configuration.thumborUrl + 'unsafe/' + ((option.fitting) ? fit : '') + size
      + ((option.filter) ? filtersUrl + '/' : '') + imageUrl;

    return finalUrl;
  }
}
