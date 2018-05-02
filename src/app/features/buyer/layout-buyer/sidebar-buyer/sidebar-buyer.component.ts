import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShareMessageService } from '@belisada/core/services';

@Component({
    selector: 'app-sidebar-buyer',
    templateUrl: './sidebar-buyer.component.html',
    styleUrls: ['./sidebar-buyer.component.scss']
})

export class SidebarBuyerComponent implements OnInit {
    flag: string;
    btnJual: boolean;
    public location = '';

    constructor(
        private router: Router,
        private shareMessageService: ShareMessageService
    ) {
        this.location = router.url;
    }

    ngOnInit() {
        this.btnJual = false;
    }

    cekFlag() {
        this.shareMessageService.currentMessage.subscribe(respon => {
            this.flag = respon;
            if (this.flag === 'create-store') {
                this.btnJual = true;
            }
        });
    }

    goToCreateStore() {
        this.router.navigateByUrl('/buyer/create-store');
        this.cekFlag();
    }

    profile() {
        this.btnJual = false;
        this.router.navigateByUrl('/buyer/profile');
    }
}
