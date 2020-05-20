import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocationsComponent } from './form-locations.component';

describe('FormLocationsComponent', () => {
  let component: FormLocationsComponent;
  let fixture: ComponentFixture<FormLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
