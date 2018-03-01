import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MBerjualanBelisadaComponent } from './m-berjualan-belisada.component';

describe('MBerjualanBelisadaComponent', () => {
  let component: MBerjualanBelisadaComponent;
  let fixture: ComponentFixture<MBerjualanBelisadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MBerjualanBelisadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MBerjualanBelisadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
