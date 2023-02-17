import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'categories/create', component: CreateCategoryComponent },
  { path: 'categories/edit/:id', component: EditCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
