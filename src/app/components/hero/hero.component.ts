import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SearchFormComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {}
