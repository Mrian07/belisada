import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BerjualanBelisadaComponent } from './berjualan-belisada.component';

describe('BerjualanBelisadaComponent', () => {
  let component: BerjualanBelisadaComponent;
  let fixture: ComponentFixture<BerjualanBelisadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BerjualanBelisadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BerjualanBelisadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
