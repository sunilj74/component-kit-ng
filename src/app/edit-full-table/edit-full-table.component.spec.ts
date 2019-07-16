import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFullTableComponent } from './edit-full-table.component';

describe('EditFullTableComponent', () => {
  let component: EditFullTableComponent;
  let fixture: ComponentFixture<EditFullTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFullTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFullTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
