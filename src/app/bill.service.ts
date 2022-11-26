import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private BASE_URL = "";
  constructor(private http: HttpClient) { }

  public createBill(name: string, description: string, amount:number, dueDate: Date): Observable<any>{
    // return of(true);
    let request = {
      "id": 0,
      "name": name,
      "description": description,
      "amount": amount,
      "dueDate": dueDate
    };
    return this.http.post<any>(this.BASE_URL + `/api/bills`, request); 
  }

  public readBills(): Observable<any[]>{
    //return of([{"id":1,"name":"Mauricio Romero","description":"Maestría","amount":5000.00,"dueDate":"2022-11-19T14:32:23.033"},{"id":3,"name":"algo","description":"algo","amount":100.00,"dueDate":"2022-11-19T16:00:48.39"},{"id":4,"name":"algo","description":"algo","amount":100.00,"dueDate":"2022-11-19T16:00:48.39"}])
    return this.http.get<any>(this.BASE_URL + `/api/bills`);
  }

  public updateBill(id: number, name: string, description: string, amount:number, dueDate: Date): Observable<any>{
    //return of(true);
    let request = {
      "id": id,
      "name": name,
      "description": description,
      "amount": amount,
      "dueDate": dueDate
    };
    return this.http.put<any>(this.BASE_URL + `/api/bills/${id}`, request);
  }

  public deleteBill(id:number){
    return this.http.delete<any>(this.BASE_URL + `/api/bills/${id}`);
  }
}