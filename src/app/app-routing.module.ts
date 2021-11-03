import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionsComponent } from './champions-list/champions.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ItemsComponent } from './items-list/items.component';
import { PatchNotesComponent } from './patch-notes/patch-notes.component';
import { TeamCompBuilderComponent } from './team-comp-builder/team-comp-builder.component';
import { TeamCompsComponent } from './team-comps/team-comps.component';
import { TraitsComponent } from './traits-list/traits.component';

const routes: Routes = [
  { path: 'patch-notes', component: PatchNotesComponent },
  { path: 'team-comps', component: TeamCompsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'team-comp-builder', component: TeamCompBuilderComponent },
  { path: 'champions-list', component: ChampionsComponent },
  { path: 'items-list', component: ItemsComponent },
  { path: 'traits-list', component: TraitsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
