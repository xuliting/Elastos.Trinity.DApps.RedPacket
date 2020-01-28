import { TestBed } from '@angular/core/testing';

import { PacketService } from './packet.service';

describe('PacketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacketService = TestBed.get(PacketService);
    expect(service).toBeTruthy();
  });
});
