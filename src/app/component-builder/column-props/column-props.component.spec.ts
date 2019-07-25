import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnPropsComponent } from './column-props.component';

describe('ColumnPropsComponent', () => {
  let component: ColumnPropsComponent;
  let fixture: ComponentFixture<ColumnPropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnPropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
