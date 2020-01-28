import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketCreatedPage } from './packet-created.page';

describe('PacketCreatedPage', () => {
  let component: PacketCreatedPage;
  let fixture: ComponentFixture<PacketCreatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketCreatedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketCreatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
