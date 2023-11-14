import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutemployeeComponent } from './ajoutemployee.component';

describe('AjoutemployeeComponent', () => {
  let component: AjoutemployeeComponent;
  let fixture: ComponentFixture<AjoutemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutemployeeComponent]
    });
    fixture = TestBed.createComponent(AjoutemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
