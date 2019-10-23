import { Component, Input } from '@angular/core';
import { WebRequestService } from '../web-request.service';
import { SocketClientService } from '../socket.io-client/socket.io-client.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NotificationComponent } from '../notification/notification.component';

export interface Reservation {
    parkingID: string;
    firstName: string;
    lastName: string;
    time: number;
}

@Component({
    selector: 'app-reservation-parking',
    templateUrl: './reservation-parking.component.html',
    styleUrls: ['./reservation-parking.component.scss'],
})
export class ReservationParkingComponent {
    @Input()
    public parkingID: string;
    // tslint:disable-next-line:no-input-rename
    @Input('parkingStreet')
    public parkingStreet: string;

    public model: Reservation;
    public errorNoParkingID: boolean;

    public constructor(private _webRequest: WebRequestService,
                       private socket: SocketClientService,
                       protected dialog: MatDialog) {
        this.parkingID = undefined;
        this.parkingStreet = '';
        this.errorNoParkingID = true;
        this.model = {
            parkingID: null,
            firstName: null,
            lastName: null,
            time: undefined
        };
    }

    public onSubmit(f: NgForm): void {
        this.model.parkingID = this.parkingID;
        if (this.parkingID) {
            this.socket.socket.emit('reservation', this.parkingID);
            this._webRequest.makeReservation(this.model.parkingID, this.model.time);
            this.dialog.open(NotificationComponent, {
                height: '170px',
                width: '500px',
                data: {message: 'Reservation successful!',
                       message2: '',
                       reservationOver: 'false',
                       id: ''}
            });
            f.reset();
        }
    }
}
