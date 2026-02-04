import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsUi } from './notifications-ui';

describe('NotificationsUi', () => {
  let component: NotificationsUi;
  let fixture: ComponentFixture<NotificationsUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsUi],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
