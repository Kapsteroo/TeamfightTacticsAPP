import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynergyListComponent } from './synergy-list.component';

describe('SynergyListComponent', () => {
  let component: SynergyListComponent;
  let fixture: ComponentFixture<SynergyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynergyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynergyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
