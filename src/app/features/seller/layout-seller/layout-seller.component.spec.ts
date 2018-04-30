import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSellerComponent } from './layout-seller.component';

describe('LayoutSellerComponent', () => {
	let component: LayoutSellerComponent;
	let fixture: ComponentFixture<LayoutSellerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ LayoutSellerComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LayoutSellerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
