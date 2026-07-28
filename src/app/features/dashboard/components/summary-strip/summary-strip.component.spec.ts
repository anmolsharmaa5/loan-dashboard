import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryStripComponent } from './summary-strip.component';

describe('SummaryStripComponent', () => {
  let component: SummaryStripComponent;
  let fixture: ComponentFixture<SummaryStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryStripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
