import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSallesReportComponent } from './m-salles-report.component';

describe('MSallesReportComponent', () => {
  let component: MSallesReportComponent;
  let fixture: ComponentFixture<MSallesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSallesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSallesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
