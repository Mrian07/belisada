import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MFrontHomeComponent } from './m-front-home.component';

describe('MFrontHomeComponent', () => {
  let component: MFrontHomeComponent;
  let fixture: ComponentFixture<MFrontHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFrontHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFrontHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
