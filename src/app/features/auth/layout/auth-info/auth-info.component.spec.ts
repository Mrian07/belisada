import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthInfoComponent } from '@belisada/feature/auth/layout/auth-info/auth-info.component';


describe('LeftComponent', () => {
    let component: AuthInfo;
    let fixture: ComponentFixture<LeftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ LeftComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
