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
    return this.http.get<Response>(`${environment.API_ROOT}/people`).pipe(
      map((response) => response.results),
      catchError(this.handleError<Person[]>(`getPerson`, []))
    );
  }

  /**
   * Person情報を保存する。
   * @param {number} id
   * @param {Person} person
   * @returns {Person}
   */
  savePerson(id: number, person: Person): Observable<Person> {
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
