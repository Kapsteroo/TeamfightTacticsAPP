import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { makeChampion } from '../../testing/champion-fixtures';
import { firebaseStubProviders } from '../../testing/firebase-stubs';
import { FavoritesService } from '../services/favorites.service';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let favService: jasmine.SpyObj<FavoritesService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    favService = jasmine.createSpyObj('FavoritesService', ['addFavTeam']);
    favService.addFavTeam.and.resolveTo();
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BoardComponent],
      providers: [
        ...firebaseStubProviders,
        { provide: FavoritesService, useValue: favService },
        { provide: MatDialog, useValue: dialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders 28 board squares', () => {
    const squares = fixture.nativeElement.querySelectorAll('app-square');
    expect(squares.length).toBe(28);
  });

  it('adds and removes champions', () => {
    const jinx = makeChampion();
    const vi = makeChampion({ name: 'Vi' });
    component.addToTeam(jinx);
    component.addToTeam(vi);
    component.removeFromTeam(jinx);
    expect(component.team).toEqual([vi]);
  });

  it('does not remove anything for a champion that is not on the board', () => {
    const jinx = makeChampion();
    component.addToTeam(jinx);
    component.removeFromTeam(makeChampion({ name: 'Vi' }));
    expect(component.team).toEqual([jinx]);
  });

  it('does not save an empty team', () => {
    component.saveToFavorites();
    expect(favService.addFavTeam).not.toHaveBeenCalled();
  });

  it('saves the team and shows a confirmation', async () => {
    const jinx = makeChampion();
    component.addToTeam(jinx);
    component.saveToFavorites();
    await fixture.whenStable();
    expect(favService.addFavTeam).toHaveBeenCalledWith({ team: [jinx] });
    expect(dialog.open).toHaveBeenCalled();
  });
});
