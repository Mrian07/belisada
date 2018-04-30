import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBuyerComponent } from './layout-buyer.component';

describe('LayoutBuyerComponent', () => {
    let component: LayoutBuyerComponent;
    let fixture: ComponentFixture<LayoutBuyerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ LayoutBuyerComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutBuyerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
