import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { makeChampion } from '../../testing/champion-fixtures';
import { ClassService } from '../services/class.service';
import { TraitService } from '../services/trait.service';

import { SynergyListComponent } from './synergy-list.component';

describe('SynergyListComponent', () => {
  let component: SynergyListComponent;
  let fixture: ComponentFixture<SynergyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynergyListComponent],
      providers: [
        {
          provide: TraitService,
          useValue: {
            getTraits: () =>
              of([{ name: 'Scrap', traitImage: 'scrap.png', bonus: '', bonusDesc: [], levels: [] }]),
          },
        },
        {
          provide: ClassService,
          useValue: {
            getClasses: () =>
              of([{ name: 'Twinshot', classImage: 'twinshot.png', bonus: '', bonusDesc: [], levels: [] }]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynergyListComponent);
    component = fixture.componentInstance;
  });

  it('renders without a team (input set before data is loaded)', () => {
    fixture.detectChanges();
    expect(component.synergies).toEqual([]);
  });

  it('counts each unique champion once per trait and class', () => {
    const jinx = makeChampion({ name: 'Jinx', trait: 'Scrap', trait2: undefined, class: 'Twinshot' });
    const ekko = makeChampion({ name: 'Ekko', trait: 'Scrap', trait2: undefined, class: 'Assassin' });
    component.team = [jinx, jinx, ekko];
    fixture.detectChanges();
    component.ngOnChanges();

    expect(component.synergies).toEqual([
      { name: 'Scrap', counter: 2, image: 'scrap.png' },
      { name: 'Assassin', counter: 1, image: '' },
      { name: 'Twinshot', counter: 1, image: 'twinshot.png' },
    ]);
  });
});
