import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeOrganizerComponent } from './become-organizer.component';

describe('BecomeOrganizerComponent', () => {
  let component: BecomeOrganizerComponent;
  let fixture: ComponentFixture<BecomeOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeOrganizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
