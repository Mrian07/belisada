import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MFaqComponent } from './m-faq.component';

describe('MFaqComponent', () => {
  let component: MFaqComponent;
  let fixture: ComponentFixture<MFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
