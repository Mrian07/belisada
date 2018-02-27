import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCareerComponent } from './m-career.component';

describe('MCareerComponent', () => {
  let component: MCareerComponent;
  let fixture: ComponentFixture<MCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
