import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../category.service';
import { UpdateCategoryRequest } from '../models/updateCategoryRequest.model';

@Component({
  selector: 'app-edit-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {


  category? : Category;
  id : string | null = null;
  paramsSubscription? : Subscription;
  editCategorySubscription? : Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService) {
  }


  ngOnInit() : void {
    this.paramsSubscription = this.route.params.subscribe ({
      next: (params) => {
        this.id = params['id'];

        if (this.id) {
          this.paramsSubscription = this.categoryService.getCategory(this.id).subscribe({
            next: (response) => {
              this.category = response;
            }
          })
        }
      }
      
    });
  }

  onFormSubmit() {
    // map api response to update category request 
    const updateCategory : UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };
    

    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategory).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  onDelete() {
    if (this.id) {
      this.editCategorySubscription = this.categoryService.deleteCategory(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }



  ngOnDestroy(): void {
     this.editCategorySubscription?.unsubscribe(); 
     this.paramsSubscription?.unsubscribe();
  }
} 