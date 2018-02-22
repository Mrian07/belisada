import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAfterSalesServiceComponent } from './m-after-sales-service.component';

describe('MAfterSalesServiceComponent', () => {
  let component: MAfterSalesServiceComponent;
  let fixture: ComponentFixture<MAfterSalesServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAfterSalesServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAfterSalesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
