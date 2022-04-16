import { Component, Input } from '@angular/core';
import { Person } from '../../models/person';

@Component({
  selector: 'component-store-edit-display',
  templateUrl: './person-edit-display.component.html',
  styleUrls: ['./person-edit-display.component.scss'],
})
export class EditDisplayComponent {
  @Input() person: Person | undefined;
}
