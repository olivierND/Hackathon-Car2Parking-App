import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Data } from '@angular/router';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

    public message: string;
    public message2: string;
    public isNotifOver: boolean;
    public id: string;
    public time: number;
    public buttonMessage: string;

    public constructor(private _webRequest: WebRequestService,
                       private dialogRef: MatDialogRef<NotificationComponent>,
                       @Inject(MAT_DIALOG_DATA) data: Data) {
        this.message = data.message;
        this.message2 = data.message2;
        this.id = data.id;
        data.reservationOver === 'true' ? this.isNotifOver = true : this.isNotifOver = false;
        this.setButtonMessage();
    }

    private setButtonMessage(): void {
        this.isNotifOver ? this.buttonMessage = 'Renew' : this.buttonMessage = 'Continue';
    }

    public fermerDialog(): void {
        if (this.isNotifOver) {
            this._webRequest.reservationOverInFive(this.id);
        }
        this.dialogRef.close();
    }

    public renewParking(): void {
        if (this.isNotifOver && this.time) {
            this._webRequest.makeReservation(this.id, this.time);
        }
        this.dialogRef.close();
    }
}
