import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudioComponent } from './update-studio.component';

describe('UpdateStudioComponent', () => {
  let component: UpdateStudioComponent;
  let fixture: ComponentFixture<UpdateStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStudioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
