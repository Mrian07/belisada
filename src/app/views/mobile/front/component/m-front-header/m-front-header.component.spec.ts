import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MFrontHeaderComponent } from './m-front-header.component';

describe('MFrontHeaderComponent', () => {
  let component: MFrontHeaderComponent;
  let fixture: ComponentFixture<MFrontHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFrontHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFrontHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
