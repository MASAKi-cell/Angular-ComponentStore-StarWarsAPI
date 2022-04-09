import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ComponentStore } from '@ngrx/component-store';
import { Person } from 'src/app/models/person';
import { state } from '@angular/animations';

export interface PersonState {
  people: Person[];
  editId?: number;
  editedPerson?: Person;
}

// Storeの初期値を設定する。
const defaultState: PersonState = {
  people: [],
  editId: undefined,
  editedPerson: undefined,
};

@Injectable()
export class PersonStore extends ComponentStore<PersonState> {
  constructor() {
    super(defaultState);
  }

  // 現在のPersonの値をStoreから取得する。
  readonly people$: Observable<Person[]> = this.select(({ people }) => people);

  // ID NumberをStoreから取得する。
  readonly editId$: Observable<number | undefined> = this.select(
    ({ editId }) => editId
  );

  // 編集済みPerson情報をStoreから取得する。かつ値のログを表示する。
  readonly editedPerson: Observable<Person | undefined> = this.select(
    ({ editedPerson }) => editedPerson
  ).pipe(
    tap((Person) => {
      console.log('editedPerson', Person);
    })
  );

  // Personの値をアップデートする。
  readonly loadPeople = this.updater((state, people: Person[] | null) => ({
    ...state,
    people: people || [],
  }));

  // ID Numberをアップデートする。
  readonly setEditId: Observable<number | undefined> = this.updater(
    (state, editId: number | undefined) => ({
      ...state,
      editId,
    })
  );

  // 編集済みPerson情報をアップデートする。
  readonly setEditedPerson: Observable<Person | undefined> = this.updater(
    (state, editedPerson: Person | undefined) => ({
      ...state,
      editedPerson,
    })
  );

}
