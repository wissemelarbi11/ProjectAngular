import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachelistComponent } from './tachelist.component';

describe('TachelistComponent', () => {
  let component: TachelistComponent;
  let fixture: ComponentFixture<TachelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TachelistComponent]
    });
    fixture = TestBed.createComponent(TachelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
