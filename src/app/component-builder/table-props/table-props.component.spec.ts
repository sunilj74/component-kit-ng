import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePropsComponent } from './table-props.component';

describe('TablePropsComponent', () => {
  let component: TablePropsComponent;
  let fixture: ComponentFixture<TablePropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
