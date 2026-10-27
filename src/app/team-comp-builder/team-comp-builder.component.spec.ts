import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { firebaseStubProviders } from '../../testing/firebase-stubs';

import { TeamCompBuilderComponent } from './team-comp-builder.component';

describe('TeamCompBuilderComponent', () => {
  let component: TeamCompBuilderComponent;
  let fixture: ComponentFixture<TeamCompBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [TeamCompBuilderComponent],
      providers: firebaseStubProviders,
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCompBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
