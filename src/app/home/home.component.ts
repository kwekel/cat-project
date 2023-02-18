import { Component } from '@angular/core';
import { CatService } from '../cat.service';
import { CatBreed } from '../models/cat-breed.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  catBreeds: CatBreed[] = [];
  isFetching = false
  error = false

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.fetchCatBreeds()
  }

  fetchCatBreeds() {
    this.isFetching = true
    this.catService.fetchAvailableBreeds().subscribe({
      next: catBreeds => {
        this.catBreeds = catBreeds
        this.isFetching = false
      }, 
      error: () => {
        this.error = true
        this.isFetching = false
      }})
  }
}
