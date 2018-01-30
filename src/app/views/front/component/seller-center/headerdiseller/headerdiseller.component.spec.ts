import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderdisellerComponent } from './headerdiseller.component';

describe('HeaderdisellerComponent', () => {
  let component: HeaderdisellerComponent;
  let fixture: ComponentFixture<HeaderdisellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderdisellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderdisellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
