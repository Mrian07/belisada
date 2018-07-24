import { Component, OnInit } from '@angular/core';
import { Globals } from '@belisada/core/services';
import { ShareMessageService } from '@belisada/core/services';

@Component({
  selector: 'bs-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  isClickOut: Boolean = false;
  constructor(private globals: Globals, private shareMessageService: ShareMessageService) {
  }

  ngOnInit() {
    this.cekMenuAllCategory();
  }

  cekMenuAllCategory() {
    this.shareMessageService.currentMessage.subscribe(respon => {
       if (respon === 'open-menu-category') {
          this.isClickOut = true;
        } else if (respon === 'close-menu-category') {
          this.isClickOut = false;
        }
    });
  }

  closeMenuAllCategory(isClickOut) {
    if (isClickOut === true) {
      this.isClickOut = false;
  
    } else {
      this.shareMessageService.changeMessage('close-menu-category');
    }
  }

}
