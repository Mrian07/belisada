import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MLostPasswordComponent } from './m-lost-password.component';

describe('MLostPasswordComponent', () => {
  let component: MLostPasswordComponent;
  let fixture: ComponentFixture<MLostPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MLostPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MLostPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
