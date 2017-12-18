import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukReportComponent } from './produk-report.component';

describe('ProdukReportComponent', () => {
  let component: ProdukReportComponent;
  let fixture: ComponentFixture<ProdukReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
