import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  categories$? : Observable<Category[]>;

  constructor(private categoryService: CategoryService) { 

  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

}



