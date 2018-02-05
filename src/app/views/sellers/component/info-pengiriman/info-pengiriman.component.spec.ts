import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPengirimanComponent } from './info-pengiriman.component';

describe('InfoPengirimanComponent', () => {
  let component: InfoPengirimanComponent;
  let fixture: ComponentFixture<InfoPengirimanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPengirimanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPengirimanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
