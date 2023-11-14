import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubTaskComponent } from './list-sub-task.component';

describe('ListSubTaskComponent', () => {
  let component: ListSubTaskComponent;
  let fixture: ComponentFixture<ListSubTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSubTaskComponent]
    });
    fixture = TestBed.createComponent(ListSubTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
