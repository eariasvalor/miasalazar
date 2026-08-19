import { Component } from '@angular/core';
import { ActosComponent } from '../actos/actos.component';
import { RetratoComponent } from '../retrato/retrato.component';

@Component({
  selector: 'app-home',
  imports: [RetratoComponent, ActosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
