import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MProductSearchComponent } from './m-product-search.component';

describe('MProductSearchComponent', () => {
  let component: MProductSearchComponent;
  let fixture: ComponentFixture<MProductSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MProductSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
