import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusInvoiceComponent } from './status-invoice.component';

describe('StatusInvoiceComponent', () => {
  let component: StatusInvoiceComponent;
  let fixture: ComponentFixture<StatusInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
