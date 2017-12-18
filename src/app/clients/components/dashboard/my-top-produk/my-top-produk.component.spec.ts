import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTopProdukComponent } from './my-top-produk.component';

describe('MyTopProdukComponent', () => {
  let component: MyTopProdukComponent;
  let fixture: ComponentFixture<MyTopProdukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTopProdukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTopProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
