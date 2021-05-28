import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }


  fetchData(): Observable<any[]> {
    return this.http.get(this.url)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  addData(data: any): Observable<any> {
    return this.http.post(this.url, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateData(updatedData: any): Observable<any[]> {
    return this.http.put(this.url + '/' + updatedData.id, updatedData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
