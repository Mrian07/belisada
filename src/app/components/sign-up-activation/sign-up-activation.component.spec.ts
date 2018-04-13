import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpActivationComponent } from './sign-up-activation.component';

describe('SignUpVerificationComponent', () => {
    let component: SignUpActivationComponent;
    let fixture: ComponentFixture<SignUpActivationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ SignUpActivationComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpActivationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
