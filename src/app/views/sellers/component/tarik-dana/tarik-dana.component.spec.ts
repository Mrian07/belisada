import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarikDanaComponent } from './tarik-dana.component';

describe('TarikDanaComponent', () => {
  let component: TarikDanaComponent;
  let fixture: ComponentFixture<TarikDanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarikDanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarikDanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
