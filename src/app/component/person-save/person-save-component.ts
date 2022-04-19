import { Component } from '@angular/core';
import { PersonStore } from '../../store/person.store';

@Component({
  selector: 'component-store-save-person-component',
  templateUrl: './person-save-component.html',
  styleUrls: ['./person-save-component.scss'],
})
export class SavePersonComponent {
  constructor(private personStore: PersonStore) {}

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
