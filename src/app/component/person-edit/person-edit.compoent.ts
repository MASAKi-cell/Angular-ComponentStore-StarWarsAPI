import { Component, Input } from '@angular/core';
import { Person } from 'src/app/voes/person';
import { PersonStore } from 'src/app/store/person.store';

@Component({
  selector: 'component-store-edit-person',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss'],
})
export class EditPersonComponent {
  @Input() person?: Person;

  constructor(private personStore: PersonStore) {}

  /**
   * 変更するPerson情報をStoreに渡して変更分を確定させる。
   * @returns {void}
   */
  personEdited(): void {
    this.personStore.setEditedPerson(this.person);
    return;
  }
}
