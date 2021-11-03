import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCompsComponent } from './team-comps.component';

describe('TeamCompsComponent', () => {
  let component: TeamCompsComponent;
  let fixture: ComponentFixture<TeamCompsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCompsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
