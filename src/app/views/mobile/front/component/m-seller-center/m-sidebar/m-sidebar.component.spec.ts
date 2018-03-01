import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSidebarComponent } from './m-sidebar.component';

describe('MSidebarComponent', () => {
  let component: MSidebarComponent;
  let fixture: ComponentFixture<MSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
