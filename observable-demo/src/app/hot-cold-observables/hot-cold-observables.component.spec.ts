import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotColdObservablesComponent } from './hot-cold-observables.component';

describe('HotColdObservablesComponent', () => {
  let component: HotColdObservablesComponent;
  let fixture: ComponentFixture<HotColdObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotColdObservablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotColdObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
