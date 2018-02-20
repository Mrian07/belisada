import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MMenuProfileComponent } from './m-menu-profile.component';

describe('MMenuProfileComponent', () => {
  let component: MMenuProfileComponent;
  let fixture: ComponentFixture<MMenuProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMenuProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMenuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
