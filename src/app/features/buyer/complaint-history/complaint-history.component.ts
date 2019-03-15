import { Component, OnInit } from '@angular/core';
import { ComplaintService } from './../../../core/services/complaint/complaint.service';
import { Complaint } from '@belisada/core/models/complaint/complaint.model';
import { LoadingService } from '@belisada/core/services/globals/loading.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complaint-history',
  templateUrl: './complaint-history.component.html',
  styleUrls: ['./complaint-history.component.scss']
})
export class ComplaintHistoryComponent implements OnInit {

  complaint: Complaint = new Complaint;
  isLoading: boolean;

  lastPage: number;
  currentPage: number;
  pages: any = [];
  x: any;

  status = 'LIST';
  a: any;

  constructor(
    private complaintService: ComplaintService,
    private loadingService: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.currentPage = (queryParam.page) ? queryParam.page : 1;
      this.status = (queryParam.status) ? queryParam.status : 'LIST';
      this.complaintList();
    });
  }

  complaintList(q?: string) {
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
      status: this.status
    };


    this.complaintService.getComplaint(queryParams).subscribe(response => {

      this.complaint = response;
      this.a = response.totalElements;
      this.pages = [];
      this.lastPage = this.complaint.totalPages;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.complaint.totalPages) {
          this.pages.push(r);
        }
      }

    });
  }


}
