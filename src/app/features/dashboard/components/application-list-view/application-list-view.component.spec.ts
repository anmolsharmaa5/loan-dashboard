import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListViewComponent } from './application-list-view.component';

describe('ApplicationListViewComponent', () => {
  let component: ApplicationListViewComponent;
  let fixture: ComponentFixture<ApplicationListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
