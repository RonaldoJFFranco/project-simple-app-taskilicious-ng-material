import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private route : Router
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  sendForm(){
    if (this.form.valid) {
      this.categoriesService.addNew(this.form.value).subscribe(
        (resp: any) => {
          this.route.navigate(['/']);
        }
      )
    }
  }
}
