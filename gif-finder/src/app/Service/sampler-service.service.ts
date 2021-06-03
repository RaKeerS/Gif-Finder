import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SamplerServiceService {

  public categorySubject = new Subject<any>();

  public subcategorySubject = new Subject<any>();

  constructor() { 
    
  }
}
