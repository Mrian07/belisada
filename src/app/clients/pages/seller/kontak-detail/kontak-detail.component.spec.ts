import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontakDetailComponent } from './kontak-detail.component';

describe('KontakDetailComponent', () => {
  let component: KontakDetailComponent;
  let fixture: ComponentFixture<KontakDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontakDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontakDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
