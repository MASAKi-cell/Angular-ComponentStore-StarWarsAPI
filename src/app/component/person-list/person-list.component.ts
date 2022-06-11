import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PersonStore } from 'src/app/store/person.store';

@Component({
  selector: 'component-store-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class personListComponent implements OnInit, OnDestroy {
  protected readonly onDestroy$ = new EventEmitter();

  // Storeから現在のPerson情報を取得
  people$ = this.personStore.people$;

  displayedColumns = [
    'name',
    'birth_year',
    'eye_color',
    'gender',
    'hair_color',
    'height',
    'mass',
    'controls',
  ];

  constructor(private personStore: PersonStore) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.emit();
  }

  /**
   * Person情報を変更
   * @param {id}
   */
  editPerson(id: number): void {
    this.personStore.editPerson(id);
    return;
  }
}
