import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationParkingComponent } from './reservation-parking.component';

describe('ReservationParkingComponent', () => {
  let component: ReservationParkingComponent;
  let fixture: ComponentFixture<ReservationParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
