import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnpBelisadaComponent } from './knp-belisada.component';

describe('KnpBelisadaComponent', () => {
  let component: KnpBelisadaComponent;
  let fixture: ComponentFixture<KnpBelisadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnpBelisadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnpBelisadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
