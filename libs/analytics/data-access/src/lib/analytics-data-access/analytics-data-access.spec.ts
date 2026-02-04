import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsDataAccess } from './analytics-data-access';

describe('AnalyticsDataAccess', () => {
  let component: AnalyticsDataAccess;
  let fixture: ComponentFixture<AnalyticsDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsDataAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
