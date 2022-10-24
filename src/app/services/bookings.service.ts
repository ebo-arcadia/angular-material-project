import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Booking } from "../model/Booking";

@Injectable({
    providedIn: "root"
})

export class BookingService {
    constructor(private _httpClient: HttpClient) { }

    getBookings(): Observable<Booking[]> {
       return this._httpClient.get<Booking[]>(`http://localhost:7100/bookings`);
    }
}