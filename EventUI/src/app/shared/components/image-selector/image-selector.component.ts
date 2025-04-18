import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EventImage } from '../../models/eventImage.model';
import { ImageService } from '../../services/image.service';
import { Event as RouterEvent } from '@angular/router';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule, CommonModule],
  providers: [],
  standalone: true,
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})


export class ImageSelectorComponent {

  private file?: File;

  fileName: string ='';
  title: string = '';
  images$?: Observable<EventImage[]>;

  @ViewChild('form', {static : false}) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService) {

  }
  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(pevent: Event) {
    const element = pevent.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage() : void {
    if (this.file && this.fileName != '' && this.title != '') {
      //Image Service to Upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.file = undefined;
          this.getImages();

          this.selectImage(response);
        }
      });

    }
  }

  selectImage(image: EventImage) : void {
    this.imageService.selectImage(image);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }
}