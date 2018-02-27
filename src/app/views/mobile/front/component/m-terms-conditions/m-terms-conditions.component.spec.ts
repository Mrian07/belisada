import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTermsConditionsComponent } from './m-terms-conditions.component';

describe('MTermsConditionsComponent', () => {
  let component: MTermsConditionsComponent;
  let fixture: ComponentFixture<MTermsConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTermsConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
