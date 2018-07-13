import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerimakasihPageComponent } from './terimakasih-page.component';

describe('TerimakasihPageComponent', () => {
  let component: TerimakasihPageComponent;
  let fixture: ComponentFixture<TerimakasihPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerimakasihPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerimakasihPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
