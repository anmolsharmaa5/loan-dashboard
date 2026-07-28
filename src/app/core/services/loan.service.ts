import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalApiValue } from '../../../common/globalApi';
import { BehaviorSubject, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoanService {
  private baseURL: any;
  useLocalData = false;
  filterData: any = new BehaviorSubject({})
  filteredApplications = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiUrl.baseUrl
  }

  getApplication(useLocal: boolean = false) {
    let endpoint = GlobalApiValue.GET_LOAN_APPLICATIONS

    if (useLocal) {
      return this.http.get<any>('assets/db.json');
    }
    return this.http.get(this.baseURL + endpoint).pipe(
    );
  }
  

}
