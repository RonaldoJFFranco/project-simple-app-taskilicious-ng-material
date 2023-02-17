import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  route = 'https://63761992b5f0e1eb850298da.mockapi.io/'
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.route}categories`).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }

  getById(categoryId: string){
    return this.http.get<any>(`${this.route}categories/${categoryId}`).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }

  addNew(newCategory: Category){
    return this.http.post<any>(`${this.route}categories`, newCategory).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }

  editById(category: Category){
    return this.http.put<any>(`${this.route}categories/${category.id}`, category).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }
}
