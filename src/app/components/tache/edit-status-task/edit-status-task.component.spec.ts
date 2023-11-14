import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatusTaskComponent } from './edit-status-task.component';

describe('EditStatusTaskComponent', () => {
  let component: EditStatusTaskComponent;
  let fixture: ComponentFixture<EditStatusTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStatusTaskComponent]
    });
    fixture = TestBed.createComponent(EditStatusTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
