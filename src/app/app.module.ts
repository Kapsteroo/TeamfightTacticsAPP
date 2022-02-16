import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { AngularFireModule } from '@angular/fire/compat';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PatchService } from './services/patch.service';
import { AddPatchComponent } from './add-patch/add-patch.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ClassesComponent } from './classes-list/classes.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { SaveTeamComponent } from './save-team/save-team.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    AddPatchComponent,
    NavBarComponent,
    ClassesComponent,
    SquareComponent,
    BoardComponent,
    SaveTeamComponent,
  ],
  imports: [
    DragDropModule,
    MatCardModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
  ],
  providers: [ScreenTrackingService, UserTrackingService, PatchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
