import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  form: FormGroup;
  categories: any;
  teamMembers: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private taskService: TasksService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      teamMemberIds: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTeamMembers();
    this.getTaskById(this.activatedRoute.snapshot.params['id']);
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

  getTaskById(id: string){
    this.taskService.getById(id).subscribe(
      (resp: any) => {
        this.form.controls['name'].setValue(resp.name);
        this.form.controls['categoryId'].setValue(resp.categoryId);
        this.form.controls['id'].setValue(resp.id);
        resp.teamMemberIds.forEach((el: any) => {
          this.addMember(el);
        });
        this.markMembers(resp.teamMemberIds);
      }
    )
  }

  markMembers(teamMemberIds: any){
    this.teamMembers.forEach((el: { checked: boolean; id: any; }) => {
      el.checked = teamMemberIds.includes(el.id) ? true : false;
    });
    this.cd.detectChanges();
  }

  sendForm() {
    if (this.form.valid) {
      this.taskService.editById(this.form.value).subscribe(
        (resp: any) => {
          this.route.navigate(['/categories', this.form.value.categoryId]);
        }
      )
    }
  }
}
