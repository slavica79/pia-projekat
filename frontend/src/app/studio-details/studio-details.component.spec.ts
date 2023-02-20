import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioDetailsComponent } from './studio-details.component';

describe('StudioDetailsComponent', () => {
  let component: StudioDetailsComponent;
  let fixture: ComponentFixture<StudioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
