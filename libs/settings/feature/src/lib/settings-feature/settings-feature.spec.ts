import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsFeature } from './settings-feature';

describe('SettingsFeature', () => {
  let component: SettingsFeature;
  let fixture: ComponentFixture<SettingsFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
