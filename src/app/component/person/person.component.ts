import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { first } from 'rxjs/operators';
import { StarsWarsWebService } from 'src/app/service/star-wars.web-service';
import { PersonStore } from 'src/app/store/person.store';
import { Person } from 'src/app/voes/person';

@UntilDestroy()
@Component({
  selector: 'component-store-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: [PersonStore],
})
export class PersonComponent implements OnInit, OnDestroy {
  protected readonly onDestroy$ = new EventEmitter();

  // 変更したPerson情報を取得する。
  editedPerson$ = this.personStore.editedPerson$;

  constructor(
    private personStore: PersonStore,
    private starsWarsWebService: StarsWarsWebService
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.emit();
  }

  ngOnInit(): void {
    // serviceを使用して、StoreからPerson情報を呼び出しアップデートさせる。
    this.starsWarsWebService
      .getPeople()
      .pipe(first(), untilDestroyed(this))
      .subscribe({
        next: (people: Person[]) => {
          this.personStore.loadPeople(people);
        },
      });
  }
}
