import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salles-report',
  templateUrl: './salles-report.component.html',
  styleUrls: ['./salles-report.component.scss']
})
export class SallesReportComponent implements OnInit {

  constructor() { }
  selectedOption: string;
  optionsLookup: string;
  alertSelected: any;
  options: any;
  ngOnInit() {
  }

}
