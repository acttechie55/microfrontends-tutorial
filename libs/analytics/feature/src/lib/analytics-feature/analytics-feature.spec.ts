import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsFeature } from './analytics-feature';

describe('AnalyticsFeature', () => {
  let component: AnalyticsFeature;
  let fixture: ComponentFixture<AnalyticsFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
