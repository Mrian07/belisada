import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTokoComponent } from './m-toko.component';

describe('MTokoComponent', () => {
  let component: MTokoComponent;
  let fixture: ComponentFixture<MTokoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTokoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTokoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
