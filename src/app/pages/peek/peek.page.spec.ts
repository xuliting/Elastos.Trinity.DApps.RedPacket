import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeekPage } from './peek.page';

describe('PeekPage', () => {
  let component: PeekPage;
  let fixture: ComponentFixture<PeekPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeekPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
