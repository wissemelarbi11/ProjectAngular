import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubTaskComponent } from './edit-sub-task.component';

describe('EditSubTaskComponent', () => {
  let component: EditSubTaskComponent;
  let fixture: ComponentFixture<EditSubTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubTaskComponent]
    });
    fixture = TestBed.createComponent(EditSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
