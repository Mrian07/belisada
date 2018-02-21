import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCourierComponent } from './m-courier.component';

describe('MCourierComponent', () => {
  let component: MCourierComponent;
  let fixture: ComponentFixture<MCourierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCourierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
