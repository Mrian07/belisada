import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LacakBarangAndaComponent } from './lacak-barang-anda.component';

describe('LacakBarangAndaComponent', () => {
  let component: LacakBarangAndaComponent;
  let fixture: ComponentFixture<LacakBarangAndaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LacakBarangAndaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LacakBarangAndaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
