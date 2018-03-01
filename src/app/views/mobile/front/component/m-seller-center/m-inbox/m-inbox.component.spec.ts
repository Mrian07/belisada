import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MInboxComponent } from './m-inbox.component';

describe('MInboxComponent', () => {
  let component: MInboxComponent;
  let fixture: ComponentFixture<MInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
