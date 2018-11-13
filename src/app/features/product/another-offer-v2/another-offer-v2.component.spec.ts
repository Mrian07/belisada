import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherOfferV2Component } from './another-offer-v2.component';

describe('AnotherOfferV2Component', () => {
  let component: AnotherOfferV2Component;
  let fixture: ComponentFixture<AnotherOfferV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotherOfferV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherOfferV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
