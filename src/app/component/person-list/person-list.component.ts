import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonStore } from 'src/app/store/person.store';

@Component({
  selector: 'component-store-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class personListComponent {

  constructor(private personStore: PersonStore) {}

  // Person情報をStoreから呼び出しViewにに表示する。
  people$ = this.personStore.peaple$;

  displayedColumns = [
    'name',
    'birth_year',
    'eye_color',
    'gender',
    'hair_color',
    'height',
    'mass',
  ];

}
