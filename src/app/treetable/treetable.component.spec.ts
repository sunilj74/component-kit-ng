import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTableComponent } from './treetable.component';

describe('TreetableComponent', () => {
  let component: TreeTableComponent;
  let fixture: ComponentFixture<TreeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
