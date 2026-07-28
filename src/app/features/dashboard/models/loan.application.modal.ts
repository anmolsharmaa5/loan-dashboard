export interface LoanApplication {
  id: string;
  applicantName: string;
  loanType: 'Personal' | 'Business' | 'Home';
  amount: number;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  appliedDate: string;
  creditScore: number;
  assignedTo: string;
  remarks: string;
}