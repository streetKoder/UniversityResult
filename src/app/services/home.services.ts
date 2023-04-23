import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { results } from "../constant"

@Injectable({ providedIn: 'root' })

export class HomeService {
  constructor(  
){}

checkResult(regNumber:any)
{
  let resultObj = results.filter(x=>x.regNumber == regNumber);
  return of(resultObj);
}


}