import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { EmailNewsLetterService } from '../../../../core/service/email-news-letter/email-news-letter.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-front-footer',
  templateUrl: './front-footer.component.html',
  styleUrls: ['./front-footer.component.scss']
})
export class FrontFooterComponent implements OnInit {
  emailSubscription: any;
  constructor(private emailNewsLetterService: EmailNewsLetterService, public translate: TranslateService) { }

  ngOnInit() {

  }

  subscribeNewsLatter(emailSubscription) {
    const data = {
      email: emailSubscription
    };
    this.emailNewsLetterService.newsLetterSubscription(data).subscribe(response => {
      if (response.status === '1') {
        swal('Terima kasih telah berlangganan');
      } else {
        swal(response.message);
      }
    });
  }

  agree() {
    const el = document.getElementById('agreement');
    el.style.display = el.style.display === 'none' || el.style.display === '' ? 'block' : 'none';
  }

  btnTop() {
    window.scrollTo(0, 0);
  }


}
