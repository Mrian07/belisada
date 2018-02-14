import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MFrontFooterComponent } from './m-front-footer.component';

describe('MFrontFooterComponent', () => {
  let component: MFrontFooterComponent;
  let fixture: ComponentFixture<MFrontFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFrontFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFrontFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
