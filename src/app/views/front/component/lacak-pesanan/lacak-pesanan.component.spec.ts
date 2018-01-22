import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LacakPesananComponent } from './lacak-pesanan.component';

describe('LacakPesananComponent', () => {
  let component: LacakPesananComponent;
  let fixture: ComponentFixture<LacakPesananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LacakPesananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LacakPesananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
