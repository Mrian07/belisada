import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCategoryComponent } from './m-category.component';

describe('MCategoryComponent', () => {
  let component: MCategoryComponent;
  let fixture: ComponentFixture<MCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
