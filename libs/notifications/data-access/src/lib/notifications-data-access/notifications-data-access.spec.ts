import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsDataAccess } from './notifications-data-access';

describe('NotificationsDataAccess', () => {
  let component: NotificationsDataAccess;
  let fixture: ComponentFixture<NotificationsDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsDataAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
