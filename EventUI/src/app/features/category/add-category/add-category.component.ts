import { Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryRequest } from '../models/addCategoryRequest.model';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  model : AddCategoryRequest;

  private addCategorySubscription? : Subscription;

  constructor (private categoryService: CategoryService,
    private router: Router) {
    this.model = {
      name: '',
      urlHandle: ''
    }
  }

  onFromSubmit() {
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
      });
  }

  ngOnDestroy() {
    this.addCategorySubscription?.unsubscribe();
  }
}
