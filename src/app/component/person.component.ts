import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { PersonStore } from 'src/app/store/person.store';
import { StarsWarsWebService } from 'src/app/service/star-wars.web-service';
import { Person } from '../models/person';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'component-store-person-container',
  templateUrl: './person-container.component.html',
  styleUrls: ['./person-container.component.scss'],
  providers: [PersonStore],
})
export class PersonComponent implements OnInit, OnDestroy{

  protected readonly onDestroy$ = new EventEmitter();

  constructor(
    private personStore: PersonStore,
    private starsWarsWebService: StarsWarsWebService
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.emit();
  }

  ngOnInit(): void {

    // serviceを使用して、StoreからPerson情報を呼び出す。
    this.starsWarsWebService.getPeople().pipe(first(), takeUntil(this.onDestroy$)).subscribe({
      next: (person: Person[]) => {
       return this.personStore.loadPeople(person);
      }
    })
  }

}
