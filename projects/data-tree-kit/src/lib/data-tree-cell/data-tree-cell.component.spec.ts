import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTreeCellComponent } from './data-tree-cell.component';

describe('DataTreeCellComponent', () => {
  let component: DataTreeCellComponent;
  let fixture: ComponentFixture<DataTreeCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTreeCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTreeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
