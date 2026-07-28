import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-application-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './application-detail-dialog.component.html',
  styleUrl: './application-detail-dialog.component.scss'
})
export class ApplicationDetailDialogComponent {
  selectedStatus: string = ''
  statuses = [
    'Pending',
    'Under Review',
    'Approved',
    'Rejected'
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public application: any, private dialog: MatDialog,
    private dialogRef: MatDialogRef<ApplicationDetailDialogComponent>
  ) {
    this.selectedStatus = application.status;
  }

  get progress() {
    return (this.application.creditScore / 850) * 100;
  }

  updateStatus() {
    const confirm = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        message: `Change status to "${this.selectedStatus}"?`
      }
    });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.application.status = this.selectedStatus;
        this.dialogRef.close(this.application);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

}
