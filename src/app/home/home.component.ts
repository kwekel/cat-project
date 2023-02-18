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
  error = null

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.fetchCatBreeds()
  }

  fetchCatBreeds() {
    this.catService.fetchAvailableBreeds().subscribe(cat => {
      console.log(cat)
      this.catBreeds = cat
    })

  }
}
