import { Person } from 'src/app/voes/person';

export interface PersonState {
  people: Person[];
  editId?: number;
  editedPerson?: Person;
}
