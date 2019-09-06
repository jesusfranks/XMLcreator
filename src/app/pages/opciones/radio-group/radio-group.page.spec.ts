import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupPage } from './radio-group.page';

describe('RadioGroupPage', () => {
  let component: RadioGroupPage;
  let fixture: ComponentFixture<RadioGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioGroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
