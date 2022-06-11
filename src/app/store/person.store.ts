import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ComponentStore } from '@ngrx/component-store';
import { StarsWarsWebService } from 'src/app/service/star-wars.web-service';
import { PersonState } from '../models/person-state';
import { Person } from 'src/app/voes/person';

@Injectable()
export class PersonStore
  extends ComponentStore<PersonState>
  implements OnDestroy
{
  private static SESSION_STORAGE_KEY = 'starWars.state';

  private saveEditPerson$ = new Subject<void>();
  private sub: Subscription = new Subscription();
  constructor(private starsWarsWebService: StarsWarsWebService) {
    super(
      StorageUtil.getItem(PersonStore.SESSION_STORAGE_KEY) || {
        people: [],
        editId: undefined,
        editedPerson: undefined,
      }
    );

    // 編集済みPerson情報とid情報を保存
    const saveData$ = this.saveEditPerson$.pipe(
      withLatestFrom(this.editedPerson$, this.editId$),
      switchMap(([, person, editId]) =>
        this.starsWarsWebService.savePerson(person, editId)
      )
    );

    // Person情報をアップデート
    this.sub.add(
      saveData$.subscribe({
        next: (person) => {
          // Person情報をアップデート
          this.editPerson(person);

          // 編集済みのPerson情報を空に設定
          this.clearEditId();
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // 現在のPersonの値をStoreから取得
  readonly people$: Observable<Person[]> = this.select(
    ({ people }) => people
  ).pipe(tap(console.log));

  // 変更するID情報をStoreから取得
  readonly editId$: Observable<number | undefined> = this.select(
    ({ editId }) => editId
  );

  // 編集済みPerson情報をStoreから取得
  readonly editedPerson$: Observable<Person | undefined> = this.select(
    ({ editedPerson }) => editedPerson
  );

  // Personの値をアップデート
  readonly loadPeople = this.updater((state, people: Person[] | null) => ({
    ...state,
    people: people || [],
  }));

  // ID情報をアップデート
  readonly setEditId = this.updater((state, editId: number | undefined) => ({
    ...state,
    editId,
  }));

  // 編集するperson情報をアップデート
  readonly setEditedPerson = this.updater(
    (state, editedPerson: Person | undefined) => ({
      ...state,
      editedPerson,
    })
  );

  // 既存のPerson情報のIDと一致すれば、Person情報の編集内容を保存
  readonly editPerson = this.effect(
    (personId$: Observable<number | undefined>) =>
      personId$.pipe(
        withLatestFrom(this.people$),
        tap<[number | undefined, Person[]]>(([id, people]) => {
          this.setEditId(id);

          const personToEdit: Person | undefined =
            !id && id !== 0
              ? undefined
              : people.find((person) => person.id === id);

          this.setEditedPerson({ ...(personToEdit as any) });
        })
      )
  );

  /**
   * 編集予定のPerson情報をキャンセル
   * @returns {*}
   */
  public cancelEditPerson(): any {
    this.clearEditedPerson();
  }

  /**
   * Person情報を保存
   * @returns {*}
   */
  public saveEditPerson(): any {
    this.saveEditPerson$.next();
  }

  /**
   * 更新情報を空にする
   * @returns {*}
   */
  private clearEditedPerson(): any {
    this.setEditId(undefined);
    this.setEditedPerson(undefined);
  }

  /**
   * データを削除
   */
  private readonly clearEditId = this.updater((state) => {
    return {} as PersonState;
  });
}
