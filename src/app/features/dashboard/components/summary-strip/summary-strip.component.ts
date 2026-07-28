import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoanService } from '../../../../core/services/loan.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summary-strip',
  standalone: true,
  imports: [MatCardModule,CurrencyPipe],
  templateUrl: './summary-strip.component.html',
  styleUrl: './summary-strip.component.scss'
})
export class SummaryStripComponent {
  summary = {
    totalApplications: 0,
    totalAmount: 0,
    approvalRate: 0,
    averageCreditScore: 0
  };

  constructor(private loanService: LoanService) {
  }
  ngOnInit() {
    this.loanService.filteredApplications.subscribe((data: any) => {
      this.calculateSummary(data);
    });
  }

  calculateSummary(applications: any[]) {
    const totalApplications = applications.length;
    const totalAmount = applications.reduce(
      (sum, app) => sum + app.amount,
      0
    );

    const approved = applications.filter(
      app => app.status === 'Approved'
    ).length;

    const approvalRate = totalApplications ? Math.round((approved / totalApplications) * 100) : 0;

    const averageCreditScore = totalApplications ? Math.round( 
      applications.reduce((sum, app) => sum + app.creditScore, 0) / totalApplications) : 0;

    this.summary = {
      totalApplications,
      totalAmount,
      approvalRate,
      averageCreditScore
    };
  }
}
