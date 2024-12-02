import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTaskListComponent } from './team-task-list.component';

describe('TeamTaskListComponent', () => {
  let component: TeamTaskListComponent;
  let fixture: ComponentFixture<TeamTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamTaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
