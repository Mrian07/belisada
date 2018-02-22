import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MContactUsComponent } from './m-contact-us.component';

describe('MContactUsComponent', () => {
  let component: MContactUsComponent;
  let fixture: ComponentFixture<MContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
