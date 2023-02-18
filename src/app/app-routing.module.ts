import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './pages/category/category-detail/category-detail.component';
import { CreateCategoryComponent } from './pages/category/create-category/create-category.component';
import { CreateTaskComponent } from './pages/task/create-task/create-task.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { HomeComponent } from './pages/home/home.component';
import { EditTaskComponent } from './pages/task/edit-task/edit-task.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'categories/create', component: CreateCategoryComponent },
  { path: 'categories/edit/:id', component: EditCategoryComponent },
  { path: 'task/create', component: CreateTaskComponent },
  { path: 'task/edit/:id', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
