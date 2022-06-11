import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class StarsWarsWebService {
  constructor(private http: HttpClient) {}

  /**
   * Person情報をStarWarsAPIから取得する。
   * @returns {Person[]}
   */
  getPeople(): Observable<Person[]> {
    let id: number = 1;
    let persons: Person[] = [];
    return this.http.get<Response>(`${environment.API_ROOT}/people`).pipe(
      map((response) => {
        for (const person of response.results) {
          if (!person.id) {
            const PersonDate = {
              id: id,
              name: person.name,
              birth_year: person.birth_year,
              eye_color: person.eye_color,
              gender: person.gender,
              hair_color: person.hair_color,
              height: person.height,
              mass: person.mass,
              skin_color: person.skin_color,
            };
            persons.push(PersonDate);
          }
          id++;
        }
        return persons;
      }),
      catchError(this.handleError<Person[]>(`getPerson`, []))
    );
  }

  /**
   * Person情報を保存する。
   * @param {number} id
   * @param {Person} person
   * @returns {*} Person
   */
  savePerson(person?: Person, id?: number): Observable<any> {
    return of(person);
  }

  /**
   * エラーハンドリング（失敗したHTTP操作を処理する。）
   * @param {string} operation
   * @param {T} result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // consoleに出力
      console.error(error);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}
