import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MHeaderdisellerComponent } from './m-headerdiseller.component';

describe('MHeaderdisellerComponent', () => {
  let component: MHeaderdisellerComponent;
  let fixture: ComponentFixture<MHeaderdisellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MHeaderdisellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MHeaderdisellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
