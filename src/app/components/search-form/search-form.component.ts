import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CITIES, SPORTS } from '../../shared/constants/app.constants';
import { SearchFilters, City, Sport } from '../../shared/types/venue.interface';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Output() search = new EventEmitter<SearchFilters>();
  
  readonly cities: City[] = CITIES;
  readonly sports: Sport[] = SPORTS;
  
  filters: SearchFilters = {
    city: '',
    sport: '',
    date: new Date()
  };
  
  onSearch(): void {
    if (this.filters.city && this.filters.sport && this.filters.date) {
      this.search.emit({
        ...this.filters,
        date: new Date(this.filters.date)
      });
    }
  }
  
  get minDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
