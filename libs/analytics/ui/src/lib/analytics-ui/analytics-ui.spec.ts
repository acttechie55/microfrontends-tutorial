import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsUi } from './analytics-ui';

describe('AnalyticsUi', () => {
  let component: AnalyticsUi;
  let fixture: ComponentFixture<AnalyticsUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsUi],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
