import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Doctor } from "src/interfaces/Doctor";
import { catchError, of } from 'rxjs';
import { Service } from "src/interfaces/Service";


const END_POINT = "http://localhost:3000/medecins";

@Injectable()
export class CommunicationService {
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();
  

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(END_POINT).pipe(
      catchError(this.handleError<Doctor[]>('medecins'))
    );
  }
  

  modifyDoctor(doctor: Doctor): Observable<void> {
    return this.http.put<void>(END_POINT, doctor).pipe(catchError(this.handleError<void>('medecins')));
  }

  deleteDoctor(idMedecin: number): Observable<void> {
    return this.http.delete<void>(`${END_POINT}/${idMedecin}`).pipe(catchError(this.handleError<void>('medecins'))
  );
  }

  insertDoctor(doctor: Doctor): Observable<void> {
    return this.http.post<void>(END_POINT, doctor).pipe(catchError(this.handleError<void>('medecins')));
  }
  
  getService(): Observable<Service[]> {
    return this.http.get<Service[]>("http://localhost:3000/Services").pipe(
      catchError(this.handleError<any[]>('basicGet'))
    );
  }


  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
      return () => of(result as T);
  }
}
