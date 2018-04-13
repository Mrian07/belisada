import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaniComponent } from './sani.component';

describe('SaniComponent', () => {
  let component: SaniComponent;
  let fixture: ComponentFixture<SaniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
