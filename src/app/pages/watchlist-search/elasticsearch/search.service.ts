import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
    ) { }
  newSearch = new Subject<string>();

  resultsFound = 0;

  makeSearch(searchTerm) {

  }

  searchData(wholename: string): Observable<Person[]>  {

    return this.http.get(
      "http://localhost:8080/person-search/",  //If I omit the http:// portion it'll give me a CORS error, I don't know why, but it happens
      // "http://localhost:8080/person-search/?wholename=oussema%20ben%20laden",
      {params: new HttpParams().set('wholename', wholename)}
      ).pipe(map(
        responseData => {
            const peopleArray: Person[] = [];
            console.log(responseData['searchHits'][0]['content'])
            for (const person in responseData['searchHits']) {
              peopleArray.push({ ... responseData['searchHits'][person]['content'], score: responseData['searchHits'][person]['score'] }) // gosh!
            }
            this.resultsFound = responseData['totalHits']
            return peopleArray;
        }))
  }

  // getById(id: string) {
  //   return 
  //   this.http.get(
  //     "localhost:8080/person/", 
  //     {params: {id: id}}
  //     ); 
  //     // just go to this position and get the results...
  // }
  
}
