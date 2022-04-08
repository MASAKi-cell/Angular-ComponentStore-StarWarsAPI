import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person';

export interface PersonState {
  people: Person[];
}

// Storeの初期値を設定する。
const defaultState: PersonState = {
  people: [],
};

@Injectable()
export class PersonStore extends ComponentStore<PersonState> {

  constructor() {
    super(defaultState);
  }

  // 現在のPersonの値をtoreから取得する。
  readonly people$: Observable<Person[]> = this.select(({ people }) => people);

  // Personの値をアップデートする。
  readonly loadPeople = this.updater((state, people: Person[] | null) => ({
    ...state,
    people: people || [],
  }));

}


