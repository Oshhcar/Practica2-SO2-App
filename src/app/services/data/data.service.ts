import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { RamInterface } from "../../models/ram.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://142.93.118.167/api';

  private handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError('Error realizando la operación, inténtelo de nuevo.');
  }

  ram: RamInterface;

  getRam(): Observable<RamInterface>{
    return this.http.get(`${this.baseUrl}/ram/list.php`)
    .pipe(map((ram) =>{
      this.ram = ram;
      return this.ram;
    }),
    catchError(this.handleError));
  }

}
