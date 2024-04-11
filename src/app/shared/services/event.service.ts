import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EVENT_DATA } from '../../constants/sample-data';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  getEvents(): Observable<any[]> {
    return of(EVENT_DATA);
  }
}
