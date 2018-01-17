import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSalesServiceComponent } from './after-sales-service.component';

describe('AfterSalesServiceComponent', () => {
  let component: AfterSalesServiceComponent;
  let fixture: ComponentFixture<AfterSalesServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSalesServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSalesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
