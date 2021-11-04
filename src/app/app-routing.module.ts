import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionsComponent } from './champions-list/champions.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ItemsComponent } from './items-list/items.component';
import { PatchNotesComponent } from './patch-notes/patch-notes.component';
import { TeamCompBuilderComponent } from './team-comp-builder/team-comp-builder.component';
import { TeamCompsComponent } from './team-comps/team-comps.component';
import { TraitsComponent } from './traits-list/traits.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'patch-notes', component: PatchNotesComponent },
  { path: 'team-comps', component: TeamCompsComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  { path: 'team-comp-builder', component: TeamCompBuilderComponent },
  { path: 'champions-list', component: ChampionsComponent },
  { path: 'items-list', component: ItemsComponent },
  { path: 'traits-list', component: TraitsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  LogInComponent,
  SignUpComponent,
  PatchNotesComponent,
  TeamCompsComponent,
  FavoritesComponent,
  TeamCompBuilderComponent,
  ChampionsComponent,
  TraitsComponent,
  ItemsComponent
];
