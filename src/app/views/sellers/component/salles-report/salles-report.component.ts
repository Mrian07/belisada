import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-salles-report',
  templateUrl: './salles-report.component.html',
  styleUrls: ['./salles-report.component.scss']
})
export class SallesReportComponent implements OnInit {

  constructor(private title: Title) { }
  selectedOption: string;
  optionsLookup: string;
  alertSelected: any;
  options: any;
  ngOnInit() {
    this.title.setTitle('Belisada Seller - Sales Report');
  }

}
