import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrabComponent } from './grab.component';

describe('GrabComponent', () => {
  let component: GrabComponent;
  let fixture: ComponentFixture<GrabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrabComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
