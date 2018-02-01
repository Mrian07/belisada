import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  serverWithApiUrl = 'https://api.myacico.co.id/dev';
  serverWithAccUrl = 'https://dev-acc-jav.belisada.co.id:8443/belisada-dev';
  serverWithNetUrl = 'https://api-net.belisada.co.id/belisada';
  serverWithImgUrl = 'https://storage.googleapis.com/myacicoproductimg';
}
