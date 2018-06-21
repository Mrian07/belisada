import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Configuration {
  apiURL: string = environment.apiUrl;
  apiURL2: string = environment.apiUrl2;
  apiUrlMongo: string = environment.apiUrlMongo;
}
