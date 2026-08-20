import { Component } from '@angular/core';
import { ActosComponent } from '../actos/actos.component';
import { BioComponent } from '../bio/bio.component';
import { RetratoComponent } from '../retrato/retrato.component';

@Component({
  selector: 'app-home',
  imports: [RetratoComponent, BioComponent, ActosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
