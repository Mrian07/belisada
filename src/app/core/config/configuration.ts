import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Configuration {
  serverWithApiUrl = 'https://api.myacico.co.id/dev';
  serverWithAccUrl = environment.apiUrl;
  serverWithNetUrl = 'https://api-net.belisada.co.id/belisada';
  serverWithImgUrl = 'https://storage.googleapis.com/myacicoproductimg';
}
