import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SecondDocDialogComponent } from '../../models/second-doc-dialog/second-doc-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-kyc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './kyc.component.html',
  styleUrl: './kyc.component.scss'
})
export class KycComponent {
  steps: any = [
    { label: 'Basic details', key: 'basic' },
    { label: 'Loan offers', key: 'offers' },
    { label: 'Verify KYC', key: 'kyc' },
    { label: 'Address & e-mandate', key: 'address' },
    { label: 'Sign agreement', key: 'sign' }
  ];
  activeStepIndex = 2;
  documentTypes = [
    'Udyam Registration Certificate (URC)',
    'Shop & Establishment Certificate',
    'Business/ Trade License',
    'FSSAI',
    'Import Export Certificate'
  ];

  documentType = 'Udyam Registration Certificate (URC)';
  documentNumber = '';
  uploadedFile: any = null;
  isUploadingSecondDoc = false;
  flowComplete = false;

  readonly MAX_FILE_SIZE = 2.5 * 1024 * 1024;

  readonly allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png'
  ];

  constructor(private dialog: MatDialog) { }

  get isDocOne() {
    return !this.isUploadingSecondDoc;
  }

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    if (!this.allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG and PNG files are allowed.');
      input.value = '';
      return;
    }
    if (file.size > this.MAX_FILE_SIZE) {
      alert('Maximum file size is 2.5 MB.');
      input.value = '';
      return;
    }
    this.uploadedFile = file;
  }

  // selectFile() {
  //   this.uploadedFile = { name: '(2).pdf', size: '190.3 KB' };
  // }


  changeFile(input: HTMLInputElement){
    this.uploadedFile = null;
    input.value = '';
    input.click();
  }

  formatFileSize(bytes: number) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  continue() {
    if (!this.uploadedFile) return;
    if (this.isDocOne) {
      const ref = this.dialog.open(SecondDocDialogComponent, { width: '360px' });
      ref.afterClosed().subscribe((result) => {
        if (result === 'upload') {
          this.isUploadingSecondDoc = true;
          this.uploadedFile = null;
          this.documentNumber = '';
        } else {
          this.advanceStep();
        }
      });
    } else {
      this.advanceStep();
    }
  }

  advanceStep() {
    if (this.activeStepIndex < this.steps.length - 1) {
      this.activeStepIndex++;
    }
    if (this.activeStepIndex === this.steps.length - 1) {
      this.flowComplete = true;
    }
  }

}
