import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtalaseTokoComponent } from './etalase-toko.component';

describe('EtalaseTokoComponent', () => {
  let component: EtalaseTokoComponent;
  let fixture: ComponentFixture<EtalaseTokoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtalaseTokoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtalaseTokoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
