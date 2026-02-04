import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileDataAccess } from './user-profile-data-access';

describe('UserProfileDataAccess', () => {
  let component: UserProfileDataAccess;
  let fixture: ComponentFixture<UserProfileDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileDataAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
