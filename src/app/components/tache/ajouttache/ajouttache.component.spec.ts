import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouttacheComponent } from './ajouttache.component';

describe('AjouttacheComponent', () => {
  let component: AjouttacheComponent;
  let fixture: ComponentFixture<AjouttacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouttacheComponent]
    });
    fixture = TestBed.createComponent(AjouttacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
