import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeTableComponent } from './large-table.component';

describe('LargeTableComponent', () => {
  let component: LargeTableComponent;
  let fixture: ComponentFixture<LargeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
