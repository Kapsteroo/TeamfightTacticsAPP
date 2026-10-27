import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Item } from '../models/item';
import { BaseItemService } from '../services/base-item.service';
import { CombinedItemService } from '../services/combined-item.service';

import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  const sword: Item = { id: 'BFSword', name: 'B.F. Sword', description: '', image: 'sword.png' };
  const bow: Item = { id: 'RecurveBow', name: 'Recurve Bow', description: '', image: 'bow.png' };
  const shiv: Item = {
    id: 'Shiv',
    name: 'Statikk Shiv',
    description: '',
    image: 'shiv.png',
    component1: 'RecurveBow',
    component2: 'BFSword',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      providers: [
        { provide: BaseItemService, useValue: { getBaseItems: () => of([sword, bow]) } },
        { provide: CombinedItemService, useValue: { getCombinedItems: () => of([shiv]) } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('resolves the recipe of a combined item', () => {
    component.chooseItem(shiv);
    fixture.detectChanges();
    expect(component.itemComponent1).toBe(bow);
    expect(component.itemComponent2).toBe(sword);
  });

  it('shows no recipe for a base item', () => {
    component.chooseItem(sword);
    expect(component.itemComponent1).toBeUndefined();
    expect(component.itemComponent2).toBeUndefined();
  });
});
