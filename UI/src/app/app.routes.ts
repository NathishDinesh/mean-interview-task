import { Routes } from '@angular/router';
import { ProductComponent } from './services/components/product/product.component';
import { WeatherComponent } from './services/components/weather/weather.component';

export const routes: Routes = [
    { path: '', component: ProductComponent },
    { path: 'weather', component: WeatherComponent }
];
