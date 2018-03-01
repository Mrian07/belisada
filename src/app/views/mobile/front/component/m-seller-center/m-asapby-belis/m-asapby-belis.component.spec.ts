import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAsapbyBelisComponent } from './m-asapby-belis.component';

describe('MAsapbyBelisComponent', () => {
  let component: MAsapbyBelisComponent;
  let fixture: ComponentFixture<MAsapbyBelisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAsapbyBelisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAsapbyBelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
