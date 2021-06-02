import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SamplerServiceService {

  public abs: string = 'Hello';

  public callbackFuntion: any;

  // public categories$: Observable<any> | undefined = new Observable();

  private categorySubject = new Subject<any>();
  public categorySubject1 = new Subject<any>();

  public categories$ = this.categorySubject.asObservable();

  constructor() { 
    
  }

  public emitData(data: any)
  {
    this.categorySubject.next(data);
  }
}
