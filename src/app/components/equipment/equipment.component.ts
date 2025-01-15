import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent {
  equipments = [
    {
      id: 1,
      name: 'Football',
      description: 'Professional match football',
      image: 'assets/images/football.jpg',
      price: '15',
      available: true
    },
    {
      id: 2,
      name: 'Basketball',
      description: 'Indoor/Outdoor basketball',
      image: 'assets/images/basketball.jpg',
      price: '20',
      available: true
    },
    {
      id: 3,
      name: 'Tennis Racket',
      description: 'Professional tennis racket',
      image: 'assets/images/tennis-racket.jpg',
      price: '25',
      available: false
    },
    {
      id: 4,
      name: 'Volleyball',
      description: 'Competition volleyball',
      image: 'assets/images/volleyball.jpg',
      price: '18',
      available: true
    },
    {
      id: 5,
      name: 'Table Tennis Set',
      description: 'Professional paddle set with balls',
      image: 'assets/images/table-tennis.jpg',
      price: '12',
      available: true
    }
  ];

  currentIndex = 0;
  itemsToShow = 3;

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 768) {
      this.itemsToShow = 1;
    } else if (window.innerWidth < 1200) {
      this.itemsToShow = 2;
    } else {
      this.itemsToShow = 3;
    }
  }

  ngOnInit() {
    this.onResize();
  }

  slideNext() {
    if (this.currentIndex < this.equipments.length - this.itemsToShow) {
      this.currentIndex++;
    }
  }

  slidePrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  getDotArray() {
    const dotsCount = this.equipments.length - this.itemsToShow + 1;
    return new Array(dotsCount).fill(0);
  }
}
