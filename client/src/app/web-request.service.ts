import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL: string = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root'
})
export class WebRequestService {

    public constructor(private _http: HttpClient) { }

    public makeReservation(id: string, time: number): void {
        const url: string = BASE_URL + 'reservation/' + id + '/' + time;
        this._http.post(url, url).toPromise();
    }

    public reservationOverInFive(id: string): void {
        const url: string = BASE_URL + 'reservationOverInFive/' + id;
        this._http.post(url, url).toPromise();
    }
}
