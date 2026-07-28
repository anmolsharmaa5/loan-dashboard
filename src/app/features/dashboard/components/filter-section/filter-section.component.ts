import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoanService } from '../../../../core/services/loan.service';

@Component({
  selector: 'app-filter-section',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.scss'
})
export class FilterSectionComponent implements OnInit, OnDestroy {
  filterForm !: FormGroup
  filteredApplications: any = []
  constructor(private fb: FormBuilder, private loanService: LoanService) {
    this.filterForm = this.fb.group({
      applicantName: [""],
      status: [""],
      loanType: [""],
      sortBy: [""],
      sortOrder: ['asc'],
    })

    this.loanService.filteredApplications.subscribe((data: any) => {
      this.filteredApplications = data
    });
  }
  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe((res) => {
      this.loanService.filterData.next(res)
    }
    )
  }

  toggleSortOrder() {
    const current = this.filterForm.value.sortOrder;
    this.filterForm.patchValue({ sortOrder: current === 'desc' ? 'asc' : 'desc' });
  }

  reset() {
    this.filterForm.reset({
      applicantName: '',
      status: '',
      loanType: '',
      sortBy: '',
      sortOrder: ['asc'],
    })
  }

  downloadExcel() {
    this.loanService.downloadExcel(this.filteredApplications, 'Loan')
  }

  ngOnDestroy(): void {
  }
}
