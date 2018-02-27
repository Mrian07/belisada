import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MLacakBarangAndaComponent } from './m-lacak-barang-anda.component';

describe('MLacakBarangAndaComponent', () => {
  let component: MLacakBarangAndaComponent;
  let fixture: ComponentFixture<MLacakBarangAndaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MLacakBarangAndaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MLacakBarangAndaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
