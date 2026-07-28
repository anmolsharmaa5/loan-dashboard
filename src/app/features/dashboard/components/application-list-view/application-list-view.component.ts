import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterSectionComponent } from '../filter-section/filter-section.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { LoanService } from '../../../../core/services/loan.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { debounceTime, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationDetailDialogComponent } from '../../../../models/application-detail-dialog/application-detail-dialog.component';
import { LoanApplication } from '../../models/loan.application.modal';

@Component({
  selector: 'app-application-list-view',
  standalone: true,
  imports: [MatTableModule, 
    FilterSectionComponent, DatePipe, 
    CommonModule, MatPaginatorModule, CurrencyPipe,
    MatIconModule, MatCardModule, MatButtonModule, 
    MatProgressSpinnerModule],
  templateUrl: './application-list-view.component.html',
  styleUrl: './application-list-view.component.scss'
})
export class ApplicationListViewComponent implements OnInit, OnDestroy {
  displayedColumns = ['applicantName', 'loanType', 'amount', 'status', 'date', 'action'];
  dataSource = new MatTableDataSource<LoanApplication>([]);
  originalData: LoanApplication[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  apiCall!: Subscription;
  filterSubscription!: Subscription;
  filterData: any = {};
  showLocalButton = false;

  isLoading = false;
  hasError = false;
  errorMessage = '';
  constructor(private loanService: LoanService, private dialog: MatDialog) {
    this.filterSubscription = this.loanService.filterData.pipe(debounceTime(500)).subscribe((filters: any) => {
      this.filterData = filters;
      this.applyFilters();
    });
  }
  ngOnInit(): void {
    this.getLoanApplication();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  getLoanApplication() {
    this.isLoading = true;
    this.hasError = false;
    this.showLocalButton = false;

    this.apiCall = this.loanService.getApplication().subscribe({
      next: (data: any) => {
        this.originalData = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = 'Unable to connect to the mock server.';
        this.showLocalButton = true;
      }
    });
  }

  loadLocalData() {
    this.isLoading = true;

    this.loanService.getApplication(true).subscribe({
      next: (data: any) => {
        this.originalData = data.applications;
        this.applyFilters();
        this.isLoading = false;
        this.hasError = false;
        this.showLocalButton = false;
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  applyFilters() {
    let applications = [...this.originalData];
    const { applicantName, status, loanType, sortBy, sortOrder } = this.filterData || {};
    if (applicantName) {
      applications = applications.filter(item =>
        item.applicantName.toLowerCase().includes(applicantName.toLowerCase())
      );
    }
    if (status) {
      applications = applications.filter(item => item.status === status);
    }
    if (loanType) {
      applications = applications.filter(item => item.loanType === loanType);
    }

    if (sortBy === 'amount') {
      applications.sort((a, b) =>
        sortOrder === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount
      );
    }
    if (sortBy === 'appliedDate') {
      applications.sort((a, b) =>
        sortOrder === 'asc'
          ? new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
          : new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      );
    }
    this.dataSource.data = applications;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    // console.log(this.dataSource.data.length);
    // console.log(this.dataSource.paginator);


    this.loanService.filteredApplications.next(this.dataSource.data);
  }

  openDetails(application: any) {
    const dialogRef = this.dialog.open(ApplicationDetailDialogComponent, {
      width: '750px',
      data: { ...application },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(updated => {
      if (updated) {
        const index = this.dataSource.data.findIndex(
          x => x.id === updated.id
        );
        if (index !== -1) {
          this.dataSource.data[index] = updated;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.apiCall?.unsubscribe();
    this.filterSubscription?.unsubscribe();
  }

}