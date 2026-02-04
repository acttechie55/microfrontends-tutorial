import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsFeature } from './notifications-feature';

describe('NotificationsFeature', () => {
  let component: NotificationsFeature;
  let fixture: ComponentFixture<NotificationsFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
