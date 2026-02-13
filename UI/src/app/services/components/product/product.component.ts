import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  productForm!: FormGroup;
  selectedId: string | null = null; 

  constructor(
    private service: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.load();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['']
    });
  }

  load() {
    this.service.getAll().subscribe(res => {
      this.products = res;
    });
  }

 save() {

  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  const data = this.productForm.value;

  // EDIT MODE
  if (this.selectedId) {

    this.service.update(this.selectedId, data).subscribe(() => {
      this.load();
      this.productForm.reset();
      this.selectedId = null; // reset edit mode
    });

  }
  // ADD MODE
  else {

    this.service.create(data).subscribe(() => {
      this.load();
      this.productForm.reset();
    });

  }
}


  delete(id: string) {
    this.service.delete(id).subscribe(() => {
      this.load();
    });
  }

 edit(p: any) {

  this.selectedId = p._id;

  this.productForm.patchValue({
    name: p.name,
    price: p.price,
    description: p.description
  });
}
}