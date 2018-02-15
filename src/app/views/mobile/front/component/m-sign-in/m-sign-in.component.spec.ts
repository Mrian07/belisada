import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSignInComponent } from './m-sign-in.component';

describe('MSignInComponent', () => {
  let component: MSignInComponent;
  let fixture: ComponentFixture<MSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
