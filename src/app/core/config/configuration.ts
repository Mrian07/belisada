import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  apiURL: string = environment.apiUrl;
}
