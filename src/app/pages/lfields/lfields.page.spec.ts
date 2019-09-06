import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LfieldsPage } from './lfields.page';

describe('LfieldsPage', () => {
  let component: LfieldsPage;
  let fixture: ComponentFixture<LfieldsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LfieldsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LfieldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
