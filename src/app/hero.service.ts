import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api.

  // Observable string sources
  private heroAddedSource = new Subject<Hero>();

  // Observable string streams
  heroAdded$ = this.heroAddedSource.asObservable();

  constructor(private client: HttpClient, private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    return this
      .client.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`Fetched heroes.`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this
      .client.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`Fetched hero with id ${id}.`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** PUT: update a hero on the server. **/
  updateHero(hero: Hero): Observable<any> {
    return this.client
      .put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`Updated hero w/ id=${hero.id}.`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /** POST: add a new hero to the server. */
  addHero(hero: Hero): Observable<Hero> {
    return this.client
      .post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((addedHero: Hero) => this.log(`Added hero w/ id=${addedHero.id}.`)),
        tap((addedHero: Hero) => this.heroAddedSource.next(addedHero)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  /** DELETE: delete the hero from the server. */
  delete(hero: Hero): Observable<Hero> {
    return this.client
      .delete<Hero>(`${this.heroesUrl}/${hero.id}`)
      .pipe(
        tap(_ => this.log(`Removed hero w/ id=${hero.id}.`)),
        catchError(this.handleError<Hero>('removeHero'))
      );
  }

  private log(message: string): void {
    this.messageService.push(`HeroesService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
}
