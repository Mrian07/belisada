import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-activation-layout',
  templateUrl: './activation-layout.component.html',
  styleUrls: ['./activation-layout.component.scss']
})
export class ActivationLayoutComponent implements OnInit {
  editid: any;
  constructor(private route: ActivatedRoute) {
      this.route.params.subscribe( id => {
        this.editid = id;
      });
    }

  ngOnInit() {
  }

}
