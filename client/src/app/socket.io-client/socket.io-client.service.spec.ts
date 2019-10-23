import { TestBed } from '@angular/core/testing';

import { Socket.IoClientService } from './socket.io-client.service';

describe('Socket.IoClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Socket.IoClientService = TestBed.get(Socket.IoClientService);
    expect(service).toBeTruthy();
  });
});
