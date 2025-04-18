import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './models/category.model';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AddCategoryRequest } from './models/addCategoryRequest.model';
import { UpdateCategoryRequest } from './models/updateCategoryRequest.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  

  getAllCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }


  getCategory(id : string) : Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }

  addCategory(model : AddCategoryRequest) : Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`, model, {
      headers : {
        'Authorization': this.cookieService.get('Authorization')   // set in log in method
      }
    });
  }


  updateCategory(id : string, updateCategoryRequest : UpdateCategoryRequest) : Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, updateCategoryRequest, {
      headers : {
        'Authorization': this.cookieService.get('Authorization')   // set in log in method
      }}
    );
  }
 

  deleteCategory(id : string) : Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, {
      headers : {
        'Authorization': this.cookieService.get('Authorization')   // set in log in method
      }
    });
  }

}
