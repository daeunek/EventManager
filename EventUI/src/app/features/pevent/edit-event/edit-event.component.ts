import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddEventModel } from '../models/add-event.model';
import { PeventService } from '../services/pevent.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/category.service';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { pEvent } from '../models/pEvent.model';
import { UpdateEventModel } from '../models/update-event.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/services/image.service';


@Component({
  selector: 'app-edit-event',
  imports: [CommonModule, RouterModule, FormsModule, MarkdownModule, ImageSelectorComponent],
  providers: [MarkdownService],
  standalone: true,
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit, OnDestroy {

  id : string | null = null;
  model? : pEvent;
  categories$? : Observable<Category[]>;
  selectedCategories : string[] = [];
  IsImageSeletorOpen : boolean = false;

  routeSubscription? : Subscription;
  pEventSubscription? : Subscription;
  updateEventSubscription? : Subscription;
  imageSelectSubscription? : Subscription;

  constructor(
    private route: ActivatedRoute,   //access info from the route
    private PeventService: PeventService,
    private router : Router,    //to navigate routes
    private categoryService: CategoryService,
    private imageService : ImageService
  ){}
 


  ngOnInit(): void {
      this.categories$ = this.categoryService.getAllCategories();

      this.routeSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');
          if (this.id) {
            this.pEventSubscription = this.PeventService.getEventById(this.id).subscribe({
              next: (response) => {
                this.model = response;

                this.selectedCategories = response.categories.map(x => x.id);
              }
            });
          }

          this.imageSelectSubscription = this.imageService.getSelectedImage().subscribe( {
            next: (response) => {
              if (this.model) {
                this.model.featuredImageUrl = response.url;
                this.IsImageSeletorOpen = false;
              }
            }
          })
        }
      })
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
    if (this.model && this.id) {
      var updateEvent : UpdateEventModel = {
        name: this.model.name,
        date: this.model.date,
        location: this.model.location,
        description: this.model.description,
        detailDescription: this.model.detailDescription,
        attendeesCount: this.model.attendeesCount,
        urlHandle: this.model.urlHandle,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ?? []
      };

      this.updateEventSubscription = this.PeventService.updateEvent(this.id, updateEvent).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/events');
        }
      });
    }
  }

  onDelete() : void {
    if (this.id) {
      this.PeventService.deleteEvent(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/events');
        }
      });
    }
  }

  openImageSelector() : void {
    this.IsImageSeletorOpen = true;
  }

  closeImgSelector() : void {
    this.IsImageSeletorOpen = false;
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    this.pEventSubscription?.unsubscribe();
    this.updateEventSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
