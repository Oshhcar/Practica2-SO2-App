import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { RamInterface } from "../../models/ram.interface";
import { ProcInterface } from "../../models/proc.interface";
import { DataInterface } from 'src/app/models/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://142.93.205.74/api';

  private handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError('Error realizando la operación, inténtelo de nuevo.');
  }

  ram: RamInterface;
  procesos: ProcInterface[];
  data: DataInterface;

  getRam(): Observable<RamInterface>{
    return this.http.get(`${this.baseUrl}/ram/list.php`)
    .pipe(map((ram) =>{
      this.ram = ram;
      return this.ram;
    }),
    catchError(this.handleError));
  }

  getProcesos(): Observable<DataInterface>{
    return this.http.get(`${this.baseUrl}/proc/list.php`)
    .pipe(map((data) => {
      this.data = data;
      return this.data;
    }),
    catchError(this.handleError));

  }

  deleteProceso(pid:number){
    const params = new HttpParams()
    .set('pid', pid.toString());

    this.http.delete(`${this.baseUrl}/proc/delete.php`, { params: params})
    .pipe(map(res =>{
      return true;
    }), 
    catchError(this.handleError));
    return false;
  }

}
