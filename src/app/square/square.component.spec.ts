import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { makeChampion } from '../../testing/champion-fixtures';
import { Champion } from '../models/champion';

import { SquareComponent } from './square.component';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  const dropEvent = (data: Champion[], index: number) =>
    ({ previousContainer: { data }, previousIndex: index } as unknown as CdkDragDrop<Champion[]>);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquareComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('places a dropped champion and emits it', () => {
    const vi = makeChampion({ name: 'Vi' });
    const added: Champion[] = [];
    component.eventAddChamp.subscribe((c) => added.push(c));

    component.drop(dropEvent([makeChampion(), vi], 1));

    expect(component.champion).toBe(vi);
    expect(added).toEqual([vi]);
  });

  it('ignores drops on an occupied square', () => {
    const jinx = makeChampion();
    component.drop(dropEvent([jinx], 0));
    component.drop(dropEvent([makeChampion({ name: 'Vi' })], 0));
    expect(component.champion).toBe(jinx);
  });

  it('clears the square and emits the removed champion once', () => {
    const jinx = makeChampion();
    const removed: Champion[] = [];
    component.eventRemoveChamp.subscribe((c) => removed.push(c));

    component.drop(dropEvent([jinx], 0));
    component.clearSquare();
    component.clearSquare();

    expect(component.champion).toBeUndefined();
    expect(removed).toEqual([jinx]);
  });
});
