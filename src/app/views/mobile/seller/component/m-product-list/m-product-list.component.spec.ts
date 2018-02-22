import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MProductListComponent } from './m-product-list.component';

describe('MProductListComponent', () => {
  let component: MProductListComponent;
  let fixture: ComponentFixture<MProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
