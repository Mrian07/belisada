import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCaraBerjualanComponent } from './m-cara-berjualan.component';

describe('MCaraBerjualanComponent', () => {
  let component: MCaraBerjualanComponent;
  let fixture: ComponentFixture<MCaraBerjualanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCaraBerjualanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCaraBerjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
