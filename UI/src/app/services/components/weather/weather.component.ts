import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {

  weatherForm!: FormGroup;
  weather: any = null;
  error: string = '';

  constructor(
    private service: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.weatherForm = this.fb.group({
      city: ['', Validators.required]
    });
  }

  getData() {

    if (this.weatherForm.invalid) {
      this.weatherForm.markAllAsTouched();
      return;
    }

    const city = this.weatherForm.value.city;

    this.error = '';
    this.weather = null;

    this.service.getWeather(city).subscribe({

      next: (res) => {
        this.weather = res;
      },

      error: (err) => {
        this.error = err?.error?.message || 'Unable to fetch weather';
      }

    });
  }
}
