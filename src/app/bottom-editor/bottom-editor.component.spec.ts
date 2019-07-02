import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomEditorComponent } from './bottom-editor.component';

describe('BottomEditorComponent', () => {
  let component: BottomEditorComponent;
  let fixture: ComponentFixture<BottomEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
