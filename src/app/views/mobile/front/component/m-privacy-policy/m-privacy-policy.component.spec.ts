import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPrivacyPolicyComponent } from './m-privacy-policy.component';

describe('MPrivacyPolicyComponent', () => {
  let component: MPrivacyPolicyComponent;
  let fixture: ComponentFixture<MPrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPrivacyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
