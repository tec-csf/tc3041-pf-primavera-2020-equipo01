import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCasesComponent } from './form-cases.component';

describe('FormCasesComponent', () => {
  let component: FormCasesComponent;
  let fixture: ComponentFixture<FormCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
