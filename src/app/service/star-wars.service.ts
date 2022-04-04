import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class StarsWarsService {

  constructor(private http: HttpClient) {}

  /**
   * Person情報を取得する。
   * @returns Person[]
   */
  getPeople(): Observable<Person[]> {
    return this.http.get<Response>(`${environment.API_ROOT}/people`).pipe(
      map((response) => {
        return response.results;
      })
    );
  }
}
