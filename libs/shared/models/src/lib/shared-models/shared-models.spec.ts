import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModels } from './shared-models';

describe('SharedModels', () => {
  let component: SharedModels;
  let fixture: ComponentFixture<SharedModels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModels],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedModels);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
