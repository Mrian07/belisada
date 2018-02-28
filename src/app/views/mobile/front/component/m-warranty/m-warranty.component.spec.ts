import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MWarrantyComponent } from './m-warranty.component';

describe('MWarrantyComponent', () => {
  let component: MWarrantyComponent;
  let fixture: ComponentFixture<MWarrantyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MWarrantyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
