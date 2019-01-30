import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionProductComponent } from './discussion-product.component';

describe('DiscussionProductComponent', () => {
  let component: DiscussionProductComponent;
  let fixture: ComponentFixture<DiscussionProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
