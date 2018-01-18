import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsapComponent } from './asap.component';

describe('AsapComponent', () => {
  let component: AsapComponent;
  let fixture: ComponentFixture<AsapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
