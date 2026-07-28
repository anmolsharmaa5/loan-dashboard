import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-second-doc-dialog',
  standalone: true,
 imports: [MatDialogModule, MatButtonModule, MatIconModule],
    template: `
    <div class="sheet">
      <mat-icon class="folder-icon">folder_copy</mat-icon>
      <h3>Do you have second business document?</h3>
      <button mat-raised-button color="primary" class="full-width" (click)="dialogRef.close('upload')">
        Upload Second Document
      </button>
      <button mat-button class="full-width" (click)="dialogRef.close('skip')">
        Skip &amp; Proceed
      </button>
    </div>
  `,
  styleUrl: './second-doc-dialog.component.scss'
})
export class SecondDocDialogComponent {
 constructor(public dialogRef: MatDialogRef<SecondDocDialogComponent>) {}
}

