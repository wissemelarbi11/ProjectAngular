import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSousTacheComponent } from './ajout-sous-tache.component';

describe('AjoutSousTacheComponent', () => {
  let component: AjoutSousTacheComponent;
  let fixture: ComponentFixture<AjoutSousTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutSousTacheComponent]
    });
    fixture = TestBed.createComponent(AjoutSousTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
