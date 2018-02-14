import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MFrontLayoutComponent } from './m-front-layout.component';

describe('MFrontLayoutComponent', () => {
  let component: MFrontLayoutComponent;
  let fixture: ComponentFixture<MFrontLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFrontLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFrontLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
