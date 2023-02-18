import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CatService } from '../cat.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imagePath: string | null = null
  isFetching = false
  error = false

  constructor(private catService: CatService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.fetchCatBreedImage()
  }

  fetchCatBreedImage() {
    this.isFetching = true
    this.route.params.subscribe((data: Data) => {
      this.catService.fetchCatBreedImage(data['id']).subscribe({
        next: imageData => {
          imageData.map((image) => {this.imagePath = image.url})
          this.isFetching = false
        },
        error: () => {
          this.error = true
          this.isFetching = false
        }
      })
    })
  }
}
