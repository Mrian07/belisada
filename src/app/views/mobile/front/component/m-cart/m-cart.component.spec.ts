import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCartComponent } from './m-cart.component';

describe('MCartComponent', () => {
  let component: MCartComponent;
  let fixture: ComponentFixture<MCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
