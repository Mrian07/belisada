import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Configuration {
  apiURL: string = environment.apiUrl;
  apiUrlMongo: string = environment.apiUrlMongo;
  thumborUrl: string = environment.thumborUrl;
  domainUrl: string = environment.domain;
  // imgUrl163x179: string = environment.imgUrl163x179;
}
