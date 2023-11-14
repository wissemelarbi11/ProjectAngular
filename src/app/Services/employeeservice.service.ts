import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private httpClient: HttpClient) { }

  postEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, employee);
  }

  deleteEmployee(id: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }


  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.apiUrl}/${id}`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.apiUrl}`);
  }

  checkEmployeeExists(Nom:any): Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.apiUrl}/${Nom}`);

  }
  

}
