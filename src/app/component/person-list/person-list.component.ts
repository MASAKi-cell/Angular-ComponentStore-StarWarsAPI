import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Person } from 'src/app/models/person';
import { PersonStore } from 'src/app/store/person.store';


@Component({
  selector: 'component-store-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class personListComponent {

  people$!: Person[];

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

  ngOnInit(): void{
    this.personStore.peaple$.pipe(first()).subscribe((res) => {
      console.log(res);
      this.people$ = res;
    })
  }

}
