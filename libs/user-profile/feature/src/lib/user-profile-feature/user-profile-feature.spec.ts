import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileFeature } from './user-profile-feature';

describe('UserProfileFeature', () => {
  let component: UserProfileFeature;
  let fixture: ComponentFixture<UserProfileFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
