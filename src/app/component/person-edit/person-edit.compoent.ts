import { Component, Input } from '@angular/core';
import { Person } from '../../models/person';
import { PersonStore } from '../../store/person.store';

@Component({
  selector: 'component-store-edit-person',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss'],
})
export class EditPersonComponent {
  @Input() person: Person | undefined;

  constructor() {}

}