import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddEventModel } from '../models/add-event.model';
import { PeventService } from '../services/pevent.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/category.service';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { ImageService } from '../../../shared/services/image.service';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';


@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    MarkdownModule, // Directly import the module
    ImageSelectorComponent
  ],
  providers: [MarkdownService], // Just provide the service directly
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})

export class AddEventComponent implements OnInit{
  model : AddEventModel;
  categories$? : Observable<Category[]>;
  IsImageSeletorOpen : boolean = false;

  imageSelectorScubscription? : Subscription;

  constructor (private PeventService: PeventService,
    private router : Router, private categoryService: CategoryService, private imageService : ImageService
  ) {
    this.model = {
      name: '',
      date: new Date(),
      location: '',
      description: '',
      detailDescription: '',
      attendeesCount: 0,
      urlHandle: '',
      featuredImageUrl: '',
      isVisible: false,
      categories: []
    };

  }

  onDateChange(event: string): void {
    // Keep the time portion from the existing date
    if (!this.model || !this.model.date) {
      return;
    }
    const currentDate = new Date(this.model.date);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    
    // Create a new date with the selected date but keep the time
    const newDate = new Date(event);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    
    this.model.date = newDate;
  }
  
  onTimeChange(event: string): void {
    // Keep the date portion but update the time
    if (!this.model || !this.model.date) {
      return;
    }
    const currentDate = new Date(this.model.date);
    const [hours, minutes] = event.split(':').map(Number);
    
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    
    this.model.date = currentDate;
  }


  onFormSubmit() : void {
    this.PeventService.createEvent(this.model).subscribe( {
      next: (response) => {
        this.router.navigateByUrl('/admin/events');
      }
    })
  }

  openImageSelector() : void {
    this.IsImageSeletorOpen = true;
  }

  ngOnInit() : void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectorScubscription = this.imageService.getSelectedImage().subscribe({
      next : (selectedImage) => {
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
    })
  }

  closeImageSelector() : void {
    this.IsImageSeletorOpen = false;
  }

  ngOndestroy() : void {
    this.imageSelectorScubscription?.unsubscribe();
  }


}
