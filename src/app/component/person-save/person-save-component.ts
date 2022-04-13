import { Component } from '@angular/core';
import { PersonStore } from '../../store/person.store';

@Component({
  selector: 'component-store-save-person-component',
  templateUrl: './person-save-component.html',
  styleUrls: ['./person-save-component.scss'],
})
export class SavePersonComponent {

  constructor(
    private personStore: PersonStore,
  ){}

  

}