import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSearch } from './department-search';

describe('DepartmentSearch', () => {
  let component: DepartmentSearch;
  let fixture: ComponentFixture<DepartmentSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
