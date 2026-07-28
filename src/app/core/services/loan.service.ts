import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GlobalApiValue } from '../../../common/globalApi';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { LoanApplication } from '../modals/loan.application.modal';

@Injectable({
  providedIn: 'root'
})

export class LoanService {
  private baseURL: any;
  useLocalData = false;
  filterData: any = new BehaviorSubject({})
  filteredApplications = new BehaviorSubject<LoanApplication[]>([]);

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiUrl.baseUrl
  }

  getApplication(useLocal: boolean = false) {
    let endpoint = GlobalApiValue.GET_LOAN_APPLICATIONS

  if (useLocal) {
      return this.http.get<{ applications: LoanApplication[] }>('assets/db.json');
    }
    return this.http.get(this.baseURL + endpoint).pipe(
    );
  }

  downloadExcel(data: any, type: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type);
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const file = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(file, `${type}_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

}
