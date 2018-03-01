import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MKnpBelisadaComponent } from './m-knp-belisada.component';

describe('MKnpBelisadaComponent', () => {
  let component: MKnpBelisadaComponent;
  let fixture: ComponentFixture<MKnpBelisadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MKnpBelisadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MKnpBelisadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
