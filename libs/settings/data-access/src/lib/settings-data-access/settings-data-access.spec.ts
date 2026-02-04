import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsDataAccess } from './settings-data-access';

describe('SettingsDataAccess', () => {
  let component: SettingsDataAccess;
  let fixture: ComponentFixture<SettingsDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsDataAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
