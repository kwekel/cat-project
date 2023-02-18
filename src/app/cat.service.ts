import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { CatBreed } from './models/cat-breed.model'
import { map, catchError } from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CatBreedImage } from './models/cat-breed-image.model';

@Injectable({ providedIn: 'root'})
export class CatService {
  error = new Subject<string>()

  constructor(private http: HttpClient) {}

  fetchAvailableBreeds() {
    return this.http.get<CatBreed[]>(`${environment.API_BASE_URL}breeds`)
      .pipe(map((responseData) => {
        const catBreeds: CatBreed[] = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            catBreeds.push({...responseData[key]})
          }
        }
        return catBreeds
      }),
      catchError(errorRes => {
        return throwError(() => errorRes)
      })
    )
  }

  fetchCatBreedImage(breedId: String) {
    return this.http.get<CatBreedImage[]>(`${environment.API_BASE_URL}images/search?breed_ids=${breedId}`)
      .pipe((responseData) => {
        return responseData
      },
      catchError(errorRes => {
        return throwError(() => errorRes)
      })
    )
  }
}