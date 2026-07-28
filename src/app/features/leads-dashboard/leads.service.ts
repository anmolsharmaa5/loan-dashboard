import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  constructor(private http: HttpClient) {}

  getLeads(): Observable<any[]> {
    return this.http.get<{ leads: any[] }>('assets/leads.json').pipe(map(res => res.leads));
  }
}
