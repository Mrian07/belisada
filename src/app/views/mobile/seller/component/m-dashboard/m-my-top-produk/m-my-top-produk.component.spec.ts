import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MMyTopProdukComponent } from './m-my-top-produk.component';

describe('MMyTopProdukComponent', () => {
  let component: MMyTopProdukComponent;
  let fixture: ComponentFixture<MMyTopProdukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMyTopProdukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMyTopProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
