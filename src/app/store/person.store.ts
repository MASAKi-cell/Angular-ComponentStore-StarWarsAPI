import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person';

export interface PersonState {
  peaple: Person[];
}

// Storeの初期値
const defaultState: PersonState = {
  peaple: [],
};

@Injectable()
export class PersonStore extends ComponentStore<PersonState> {

  constructor() {
    super(defaultState);
  }

  // 現在のStoreの値を選択する。
  readonly peaple$: Observable<Person[]> = this.select(({peaple}) => peaple);

  // Storeの値をアップデートする。
  readonly loadPeople = this.updater((state, people: Person[] | null) => ({
    ...state,
    people: people || [],
  }));

}


