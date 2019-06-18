import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTreeKitComponent } from './data-tree-kit.component';

describe('DataTreeKitComponent', () => {
  let component: DataTreeKitComponent;
  let fixture: ComponentFixture<DataTreeKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTreeKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTreeKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
