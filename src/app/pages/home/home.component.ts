import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any;
  defaultValue = 'A-Z';
  constructor(private categoriesService: CategoriesService, private route : Router) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoriesService.getAll().subscribe(
      (resp:any) => {
        this.categories = resp;
        this.sortCategories({value: this.defaultValue})
      }
    );
  }

  sortCategories($event:any){
    this.categories = $event.value === 'A-Z' ?
      this.categories.sort((a: { name: string; },b: { name: string; }) => a.name > b.name ? 1 : -1) :
      this.categories.sort((a: { name: string; },b: { name: string; }) => a.name < b.name ? 1 : -1)
  }
}
