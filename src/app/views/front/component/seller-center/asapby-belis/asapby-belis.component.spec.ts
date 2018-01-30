import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsapbyBelisComponent } from './asapby-belis.component';

describe('AsapbyBelisComponent', () => {
  let component: AsapbyBelisComponent;
  let fixture: ComponentFixture<AsapbyBelisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsapbyBelisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsapbyBelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
