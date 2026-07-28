import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondDocDialogComponent } from './second-doc-dialog.component';

describe('SecondDocDialogComponent', () => {
  let component: SecondDocDialogComponent;
  let fixture: ComponentFixture<SecondDocDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondDocDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondDocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
