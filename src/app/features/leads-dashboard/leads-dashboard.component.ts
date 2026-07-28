import { Component } from '@angular/core';
import { LeadService } from './leads.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-leads-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule],
  templateUrl: './leads-dashboard.component.html',
  styleUrl: './leads-dashboard.component.scss'
})
export class LeadsDashboardComponent {
  isLoading = false;
  hasError = false;
  allLeads: any = [];
  filteredLeads: any = [];
  searchTerm = '';
  displayedColumns = ['leadName', 'id', 'creationDate', 'status'];
  pageIndex = 0;
  pageSize = 9;
  funnelCards: any[] = [
    {
      title: 'Origination',
      colorClass: 'card-green',
      stages: [
        { label: 'Pending for Submission', count: 2910 },
        { label: 'Lead Submitted', count: 2500, active: true },
        { label: 'Dedupe Pass', count: 1973 }
      ]
    },
    {
      title: 'Decisioning',
      colorClass: 'card-purple',
      stages: [
        { label: 'Decision Trigger Initiate', count: 1973 },
        { label: 'Decision Approved', count: 1872 },
        { label: 'Offer Accepted', count: 1823 }
      ]
    },
    {
      title: 'KYC & Mandate',
      colorClass: 'card-dark',
      stages: [
        { label: 'KYC Approved', count: 1521 },
        { label: 'Mandate Registered', count: 1423 },
        { label: 'Agreement Signed', count: 1602 }
      ]
    },
    {
      title: 'Disbursement',
      colorClass: 'card-pink',
      stages: [
        { label: 'Agreement Signed', count: 1209 },
        { label: 'Disbursement Initiated', count: 1192 },
        { label: 'Disbursement', count: 1023 }
      ]
    }
  ];

  constructor(private leadService: LeadService) { }

  ngOnInit(): void {
    this.fetchLeads();
  }

  fetchLeads(){
    this.isLoading = true;
    this.hasError = false;
    this.leadService.getLeads().subscribe({
      next: (leads) => {
        this.allLeads = leads;
        this.applySearch();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  applySearch() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredLeads = !term
      ? [...this.allLeads]
      : this.allLeads.filter(
        (l: any) =>
          l.leadName.toLowerCase().includes(term) ||
          l.id.toLowerCase().includes(term)
      );
    this.pageIndex = 0;
  }

  get pagedLeads(){
    const start = this.pageIndex * this.pageSize;
    return this.filteredLeads.slice(start, start + this.pageSize);
  }

  get totalPages(){
    return Math.max(1, Math.ceil(this.filteredLeads.length / this.pageSize));
  }

  nextPage(){
    if (this.pageIndex < this.totalPages - 1) this.pageIndex++;
  }

  prevPage(){
    if (this.pageIndex > 0) this.pageIndex--;
  }

  statusClass(status: string){
    return 'status-' + status.toLowerCase();
  }

}
