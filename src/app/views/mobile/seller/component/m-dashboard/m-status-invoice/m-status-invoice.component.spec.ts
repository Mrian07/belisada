import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MStatusInvoiceComponent } from './m-status-invoice.component';

describe('MStatusInvoiceComponent', () => {
  let component: MStatusInvoiceComponent;
  let fixture: ComponentFixture<MStatusInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MStatusInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MStatusInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
