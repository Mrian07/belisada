import { Component, OnInit } from '@angular/core';
import { PaymentService } from '@belisada/core/services/payment/payment.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private _paymentService: PaymentService
  ) { }

  ngOnInit() {
  }

  public onSubmit() {
    swal({
      type: 'info',
      title: 'SUBMITTED! SEE CONSOLE!'
    });
    const request = {
      MerchantCode: 'ID00724',
      PaymentId: '1',
      RefNo: 'PYT-24092018-2',
      Amount: '300000',
      Currency: 'IDR',
      ProdDesc: 'Xiaomi A4',
      UserName: 'Yosi Oliver',
      UserEmail: 'yosioliver@gmail.com',
      UserContact: '085214887659',
      signature: 'iSTZlkex1m2jxnECAD4NjEHclFY=',
      ResponseURL: 'https://dev.belisada.id/payment/response',
      BackendURL: 'https://dev.belisada.id/payment/response_backend'
    };
    console.log('[IPAY88] request: ', request);
    this._paymentService.ipayEntry(request).subscribe(response => {
      console.log('[IPAY88] response: ', response);
    });
  }

}
