import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropEditComponent } from './prop-edit.component';

describe('PropEditComponent', () => {
  let component: PropEditComponent;
  let fixture: ComponentFixture<PropEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
