import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private route : Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getCategoryById(this.activatedRoute.snapshot.params['id'])
  }

  getCategoryById(id: string){
    this.categoriesService.getById(id).subscribe(
      (resp: any) => {
        this.form.controls['name'].setValue(resp.name);
        this.form.controls['id'].setValue(resp.id);
      }
    )
  }

  sendForm(){
    if (this.form.valid) {
      this.categoriesService.editById(this.form.value).subscribe(
        (resp: any) => {
          this.route.navigate(['/']);
        }
      )
    }
  }

}
