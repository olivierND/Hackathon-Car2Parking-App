import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { SocketClientService } from '../socket.io-client/socket.io-client.service';
import { MatDialog } from '@angular/material';
import { NotificationComponent } from '../notification/notification.component';

const DELAI_TIMER: number = 500;
const MTL_LAT: number = 45.505331312;
const MTL_LNG: number = -73.55249779;

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
    // tslint:disable-next-line:no-any
    protected data: Array<any>;
    public positions: Map<string, Array<number>>;
    public positionReservation: Map<string, Array<number>>;

    public lat: number;
    public lng: number;
    public hourglass: Boolean;

    public noUniqueParking: string;
    public parkingStreet: string;

    public async ngOnInit(): Promise<void> {
        this.setSocketOnEvents();
    }

    public constructor( private router: Router,
                        private dataService: DataService,
                        private socket: SocketClientService,
                        protected dialog: MatDialog) {
        this.hourglass = true;
        this.positionReservation = new Map<string, Array<number>>();
        // this.getLocation();
        this.lat = MTL_LAT;
        this.lng = MTL_LNG;
        this.noUniqueParking = null;
        this.parkingStreet = null;
        this.loadingPlaces();
    }

    // tslint:disable-next-line:max-func-body-length
    private setSocketOnEvents(): void {
        this.socket.socket.on('reservation', (id: string) => {
            this.positions.delete(id);
            if (this.positionReservation.has(id)) {
                this.dialog.open(NotificationComponent, {
                    height: '170px',
                    width: '500px',
                    data: {message: 'Sorry! This parking spot has been taken.',
                           message2: '',
                           reservationOver: 'false',
                           id: '' }
                });
                this.positionReservation.clear();
            }
        });

        this.socket.socket.on('reservationOver', (parkingSpot: any) => {
            if (this.positionReservation.has(parkingSpot.sNoPlace)) {
                this.positionReservation.clear();
            }
            this.positions.set(parkingSpot.sNoPlace, [parkingSpot.nPositionCentreLatitude, parkingSpot.nPositionCentreLongitude]);
        });

        this.socket.socket.on('reservationOverNotif', (id: string) => {
            if (this.positionReservation.has(id)) {
                this.dialog.open(NotificationComponent, {
                    height: '270px',
                    width: '600px',
                    data: {message: 'Your reservation is over in 5 minutes!',
                           message2: 'Do you want to renew it?',
                           reservationOver: 'true',
                           id: id }
                });
            }
        });
    }

    // private getLocation(): void {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((pos) => {
    //             this.lat = pos.coords.latitude;
    //             this.lng = pos.coords.longitude;
    //         });
    //     }
    // }

    public navigate(uri: string): void {
        this.router.navigateByUrl(uri);
    }

    public onMarkerClick(id: string, position: Array<number>): void {
        this.data.forEach((d) => {
            const lat: number = position[0];
            const lng: number = position[1];
            if (id === d.sNoPlace) {
                this.noUniqueParking = d.sNoPlace;
                this.parkingStreet = d.sNomRue;
                this.positionReservation.clear();
                const arrayPosition: Array<number> = [lat, lng];
                this.positionReservation.set(this.noUniqueParking, arrayPosition);

                this.scrollToForm();
            }
        });
    }

    private scrollToForm(): void {
        document.querySelector('#reservation-container').scrollIntoView({
            behavior: 'smooth'
        });
    }

    public async loadingPlaces(): Promise<void> {
        this.positions = new Map<string, Array<number>>();

        if (!this.data) {
            this.data = await this.dataService.getParkingData();
        }

        this.data.forEach((d) => {
            if (d.Occupation !== 1) {
                const arrayPosition: Array<number> = [d.nPositionCentreLatitude as number, d.nPositionCentreLongitude as number];
                this.positions.set(d.sNoPlace, arrayPosition);
            }
        });

        setTimeout(() => {
            this.hourglass = false;
        },         DELAI_TIMER);
    }
}
