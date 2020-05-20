import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBusinessesComponent } from './form-businesses.component';

describe('FormBusinessesComponent', () => {
  let component: FormBusinessesComponent;
  let fixture: ComponentFixture<FormBusinessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBusinessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
