import { Component } from '@angular/core';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { PersonStore } from '../../store/person.store';
import { Person } from 'src/app/voes/person';

@Component({
  selector: 'component-store-save-person-component',
  templateUrl: './person-save-component.html',
  styleUrls: ['./person-save-component.scss'],
})
export class SavePersonComponent {
  public person: Person[] = [];
  constructor(private personStore: PersonStore) {}

  ngOnInit() {
    let editedPereson: Person;
    this.personStore.editedPerson$.pipe(
      map((e) => {
        editedPereson = e as Person;
        return;
      })
    );

    this.personStore.people$.pipe(
      map((persons) => {
        for (const person of persons) {
          if (person.id === editedPereson.id) {
            return;
          }
        }
      })
    );
  }

  get editedPereson$(): Observable<Person | undefined> {
    return this.personStore.editedPerson$;
  }

  /**
   * 編集内容をキャンセルする。
   * @returns {void}
   */
  cancelPerson(): void {
    this.personStore.cancelEditPerson();
  }

  /**
   * 編集内容を保存する。
   * @returns {void}
   */
  savePerson(): void {
    this.personStore.saveEditPerson();
  }
}
