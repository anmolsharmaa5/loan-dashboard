import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailDialogComponent } from './application-detail-dialog.component';

describe('ApplicationDetailDialogComponent', () => {
  let component: ApplicationDetailDialogComponent;
  let fixture: ComponentFixture<ApplicationDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
