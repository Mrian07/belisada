import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSearchDashboardComponent } from './m-search-dashboard.component';

describe('MSearchDashboardComponent', () => {
  let component: MSearchDashboardComponent;
  let fixture: ComponentFixture<MSearchDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSearchDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSearchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
