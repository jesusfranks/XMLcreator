import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionPage } from './presentacion.page';

describe('PresentacionPage', () => {
  let component: PresentacionPage;
  let fixture: ComponentFixture<PresentacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
