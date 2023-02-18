import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup;
  categories: any;
  teamMembers: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private taskService: TasksService,
    private route: Router,

  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      teamMemberIds: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTeamMembers();
  }

  getCategories() {
    this.categoriesService.getAll().subscribe(
      (resp: any) => {
        this.categories = resp;
      }
    )
  }

  get members() {
    return this.form.controls["teamMemberIds"].value;
  }

  checkMember(member: any){
    !this.members.includes(member.id) ? this.addMember(member.id) :  this.removeMember(member.id)
  }

  addMember(member: any) {
    this.members.push(member);
  }

  removeMember(member: any) {
    const index = this.members.indexOf(member);
    this.members.splice(index, 1);
  }

  getTeamMembers() {
    this.taskService.getTeamMembers().subscribe(
      (resp: any) => {
        this.teamMembers = resp;
      }
    )
  }

  sendForm() {
    if (this.form.valid) {
      this.taskService.addNew(this.form.value).subscribe(
        (resp: any) => {
          this.route.navigate(['/categories', this.form.value.categoryId]);
        }
      )
    }
  }
}
