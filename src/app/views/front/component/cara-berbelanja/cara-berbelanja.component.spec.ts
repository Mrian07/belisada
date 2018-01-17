import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraBerbelanjaComponent } from './cara-berbelanja.component';

describe('CaraBerbelanjaComponent', () => {
  let component: CaraBerbelanjaComponent;
  let fixture: ComponentFixture<CaraBerbelanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaraBerbelanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaraBerbelanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
