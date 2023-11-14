import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartProjectComponent } from './chart-project.component';

describe('ChartProjectComponent', () => {
  let component: ChartProjectComponent;
  let fixture: ComponentFixture<ChartProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartProjectComponent]
    });
    fixture = TestBed.createComponent(ChartProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
