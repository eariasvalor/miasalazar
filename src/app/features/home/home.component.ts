import { Component } from '@angular/core';
import { RetratoComponent } from '../retrato/retrato.component';

@Component({
  selector: 'app-home',
  imports: [RetratoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
