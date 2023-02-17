import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  selectedCategory: Category = { name: '' };
  constructor(private categoriesService: CategoriesService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategoryById(this.activatedRoute.snapshot.params['id'])
  }

  getCategoryById(id: string) {
    this.categoriesService.getById(id).subscribe(
      (resp: any) => {
        this.selectedCategory = resp;
      }
    )
  }
}
