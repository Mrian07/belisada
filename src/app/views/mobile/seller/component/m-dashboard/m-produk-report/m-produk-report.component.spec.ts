import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MProdukReportComponent } from './m-produk-report.component';

describe('MProdukReportComponent', () => {
  let component: MProdukReportComponent;
  let fixture: ComponentFixture<MProdukReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MProdukReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MProdukReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
