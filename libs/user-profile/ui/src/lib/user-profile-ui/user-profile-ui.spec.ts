import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileUi } from './user-profile-ui';

describe('UserProfileUi', () => {
  let component: UserProfileUi;
  let fixture: ComponentFixture<UserProfileUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileUi],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
