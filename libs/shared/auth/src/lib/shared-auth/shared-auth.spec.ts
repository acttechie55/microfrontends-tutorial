import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedAuth } from './shared-auth';

describe('SharedAuth', () => {
  let component: SharedAuth;
  let fixture: ComponentFixture<SharedAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedAuth],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedAuth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
