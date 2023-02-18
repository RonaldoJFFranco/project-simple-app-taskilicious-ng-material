import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  selectedCategory: Category = { name: '' };
  displayedColumns: string[] = ['name', 'id', 'members', 'edit', 'remove',];
  dataSource: any[] = [];
  teamMembers: any;

  constructor(private categoriesService: CategoriesService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getCategoryById(this.activatedRoute.snapshot.params['id']);
    this.getTasks();
  }

  getCategoryById(id: string) {
    this.categoriesService.getById(id).subscribe(
      (resp: any) => {
        this.selectedCategory = resp;
      }
    )
  }

  getTasks() {
    this.tasksService.getAll().subscribe(
      (resp: any) => {
        this.dataSource = resp.filter((task: { categoryId: number | undefined; }) => task.categoryId == this.selectedCategory.id);
        this.getTeamMembers();
      }
    )
  }

  getTeamMembers() {
    this.tasksService.getTeamMembers().subscribe(
      (resp: any) => {
        this.teamMembers = resp;
        this.setAvatars()
      }
    )
  }

  setAvatars() {
    this.dataSource.forEach(data => {
      data.avatar = [];
      this.teamMembers.forEach((member: { id: any; avatar: any; }) => {
        if(data.teamMemberIds.includes(member.id)){
          data.avatar.push(member.avatar)
        }
      })
    });
  }

  removeTaskbyId(task: Task) {
    this.tasksService.removeById(task.id).subscribe(
      (resp) => {
        this.getTasks();
      }
    )
  }
}
