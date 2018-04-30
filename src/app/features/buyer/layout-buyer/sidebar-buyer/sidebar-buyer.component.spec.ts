import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBuyerComponent } from './sidebar-buyer.component';

describe('SidebarBuyerComponent', () => {
    let component: SidebarBuyerComponent;
    let fixture: ComponentFixture<SidebarBuyerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ SidebarBuyerComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarBuyerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
