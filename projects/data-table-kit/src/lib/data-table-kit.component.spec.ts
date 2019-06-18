import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableKitComponent } from './data-table-kit.component';

describe('DataTableKitComponent', () => {
  let component: DataTableKitComponent;
  let fixture: ComponentFixture<DataTableKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
