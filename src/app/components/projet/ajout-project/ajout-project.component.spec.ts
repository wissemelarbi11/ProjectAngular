import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProjectComponent } from './ajout-project.component';

describe('AjoutProjectComponent', () => {
  let component: AjoutProjectComponent;
  let fixture: ComponentFixture<AjoutProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutProjectComponent]
    });
    fixture = TestBed.createComponent(AjoutProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
