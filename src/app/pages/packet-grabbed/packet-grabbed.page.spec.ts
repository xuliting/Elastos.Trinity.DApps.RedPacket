import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketGrabbedPage } from './packet-grabbed.page';

describe('PacketGrabbedPage', () => {
  let component: PacketGrabbedPage;
  let fixture: ComponentFixture<PacketGrabbedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketGrabbedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketGrabbedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
