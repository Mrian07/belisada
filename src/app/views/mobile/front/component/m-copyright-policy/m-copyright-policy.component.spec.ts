import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCopyrightPolicyComponent } from './m-copyright-policy.component';

describe('MCopyrightPolicyComponent', () => {
  let component: MCopyrightPolicyComponent;
  let fixture: ComponentFixture<MCopyrightPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCopyrightPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCopyrightPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
