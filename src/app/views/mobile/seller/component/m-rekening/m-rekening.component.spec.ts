import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRekeningComponent } from './m-rekening.component';

describe('MRekeningComponent', () => {
  let component: MRekeningComponent;
  let fixture: ComponentFixture<MRekeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRekeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRekeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
