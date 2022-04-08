import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Person } from 'src/app/models/person';
import { PersonStore } from 'src/app/store/person.store';

@Component({
  selector: 'component-store-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class personListComponent implements OnInit, OnDestroy {
  
  protected readonly onDestroy$ = new EventEmitter();

  // Storeから現在のPerson情報を取得して、Viewに表示させる。
  people$ = this.personStore.people$;

  // Person情報をStoreから呼び出しViewにに表示する。
  displayedColumns = [
    'name',
    'birth_year',
    'eye_color',
    'gender',
    'hair_color',
    'height',
    'mass',
  ];

  constructor(private personStore: PersonStore) {}

  ngOnDestroy(): void {
    this.onDestroy$.emit();
  }

  ngOnInit(): void {
    // this.personStore.people$
      // .pipe(first(), takeUntil(this.onDestroy$))
      // .subscribe((res) => {
        // return (this.people$ = res);
      // });
  }
}
