import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewRegisterEventsComponent } from './admin-view-register-events.component';

describe('AdminViewRegisterEventsComponent', () => {
  let component: AdminViewRegisterEventsComponent;
  let fixture: ComponentFixture<AdminViewRegisterEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewRegisterEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewRegisterEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
