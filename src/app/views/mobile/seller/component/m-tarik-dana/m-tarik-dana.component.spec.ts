import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTarikDanaComponent } from './m-tarik-dana.component';

describe('MTarikDanaComponent', () => {
  let component: MTarikDanaComponent;
  let fixture: ComponentFixture<MTarikDanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTarikDanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTarikDanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
