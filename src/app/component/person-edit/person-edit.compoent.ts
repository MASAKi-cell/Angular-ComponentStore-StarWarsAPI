import { Component, Input } from '@angular/core';
import { Person } from 'src/app/voes/person';
import { PersonStore } from 'src/app/store/person.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'component-store-edit-person',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss'],
})
export class EditPersonComponent {
  @Input() person?: Person;

  constructor(private personStore: PersonStore) {}

  ngOnInit() {}

  // Id情報を取得
  get editId$(): Observable<number | undefined> {
    return this.personStore.editId$;
  }

  /**
   * 変更するPerson情報をStoreに渡して変更分を確定。
   * @returns {void}
   */
  personEdited(): void {
    this.personStore.setEditedPerson(this.person);
    return;
  }

  /**
   * 編集内容をキャンセル
   * @returns {void}
   */
  cancelPerson(): void {
    this.personStore.cancelEditPerson();
  }

  /**
   * 編集内容を保存
   * @returns {void}
   */
  savePerson(): void {
    this.personStore.saveEditPerson();
  }
}
