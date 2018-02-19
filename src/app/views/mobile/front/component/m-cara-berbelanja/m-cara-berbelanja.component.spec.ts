import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCaraBerbelanjaComponent } from './m-cara-berbelanja.component';

describe('MCaraBerbelanjaComponent', () => {
  let component: MCaraBerbelanjaComponent;
  let fixture: ComponentFixture<MCaraBerbelanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCaraBerbelanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCaraBerbelanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
