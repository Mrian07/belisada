import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SendEmail } from '../../model/sendemail';
import 'rxjs/add/operator/map';
import { Upgrade, UpgradeRespon, UpgradeRequet } from '../../model/upgrade';

@Injectable()
export class UpgradeService {

  constructor(private http: HttpClient, private configuration: Configuration) {
  }

  upToSeller(updateData: UpgradeRequet): Observable<UpgradeRespon[]> {
    return this.http.put(this.configuration.serverWithAccUrl + '/buyer/profile/upgrade', updateData)
        .map(resp => resp as UpgradeRespon[]);
  }
}
