import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL: string = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) {
    }

    public getParkingData(): Promise<Array<any>> {
        return this.http.get<Array<any>>(BASE_URL + 'getParkingData').toPromise();
    }
}
