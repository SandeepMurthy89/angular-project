import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { Accesstoken } from './accesstoken';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  private heroesUrl      = 'http://localhost:8000/api/v1/customers';  // URL to web api
  private accessTokenUrl = 'http://localhost:8000/api/v1/tokens'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  authHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  requestClient = {
    "client_id": "apiadmin@gmail.com",
    "client_secret" : "$2y$10$Q5f83UOm/6PImOS1BJ.52.eXa/icTI69yhwXQHEGxrYWy44K/FBUq"
  };

  getAccessToken():Observable<Accesstoken>{

    var accessToken ={} as Accesstoken;
    return this.http.post<Accesstoken>(this.accessTokenUrl,this.requestClient,this.authHttpOptions).pipe(
      tap(_ => this.log('fetched AccessToken')),
      catchError(this.handleError<Accesstoken>('getAccessToken'))
    );
  }
  private accessToken='';

  getHeroes(accessToken:string): Observable<Hero[]> {
    let httpHeader = new HttpHeaders().set('Authorization','Bearer '+accessToken);
    return this.http.get<Hero[]>(this.heroesUrl,{headers:httpHeader}).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
