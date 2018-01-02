import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesReportComponent } from './salles-report.component';

describe('SallesReportComponent', () => {
  let component: SallesReportComponent;
  let fixture: ComponentFixture<SallesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SallesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SallesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
