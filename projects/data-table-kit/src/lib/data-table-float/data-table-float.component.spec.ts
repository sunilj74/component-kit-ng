import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableFloatComponent } from './data-table-float.component';

describe('DataTableFloatComponent', () => {
  let component: DataTableFloatComponent;
  let fixture: ComponentFixture<DataTableFloatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableFloatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
