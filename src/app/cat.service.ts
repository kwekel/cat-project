import { Injectable } from '@angular/core'
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { CatBreed } from './models/cat-breed.model'
import { map, catchError, tap } from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root'})
export class CatService {
  error = new Subject<string>()

  constructor(private http: HttpClient) {}

  fetchAvailableBreeds() {
    console.log(`${environment.API_BASE_URL}breeds`)
    return this.http.get<CatBreed[]>(`${environment.API_BASE_URL}breeds`)
      .pipe(map((responseData) => {
        const catBreeds: CatBreed[] = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            catBreeds.push({...responseData[key], id: key})
          }
        }
        return catBreeds
      }))
  }
}