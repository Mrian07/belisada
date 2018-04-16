import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlagService } from '../../../../core/services/flag/flag.service';

@Component({
    selector: 'app-sidebar-buyer',
    templateUrl: './sidebar-buyer.component.html',
    styleUrls: ['./sidebar-buyer.component.scss']
})
export class SidebarBuyerComponent implements OnInit {
    flag: string;
    btnJual: boolean;

    constructor(
        private router: Router,
        private flagService: FlagService
    ) { }

    ngOnInit() {
        this.btnJual = false;
    }

    cekFlag() {
        this.flagService.currentMessage.subscribe(respon => {
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
