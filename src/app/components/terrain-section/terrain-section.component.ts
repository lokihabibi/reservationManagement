import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueCardComponent } from '../terrain-card/terrain-card.component';
import { Venue } from '../../shared/types/venue.interface';

@Component({
  selector: 'app-venues-section',
  standalone: true,
  imports: [CommonModule, VenueCardComponent],
  templateUrl: './terrain-section.component.html',
  styleUrls: ['./terrain-section.component.css']
})
export class terrainSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('venuesContainer') venuesContainer!: ElementRef;
  
  currentIndex = 0;
  maxIndex = 0;
  autoplayInterval: any;
  touchStartX = 0;
  isMobile = false;
  
  venues: Venue[] = [
    {
      id: '1',
      name: 'Stade Municipal',
      location: 'Tunis',
      price: 60,
      rating: 4.5,
      reviews: 128,
      imageUrl: 'assets/images/venue1.jpg',
      features: ['Éclairage', 'Vestiaires', 'Parking']
    },
    {
      id: '2',
      name: 'Tennis Club',
      location: 'Sfax',
      price: 45,
      rating: 4.2,
      reviews: 89,
      imageUrl: 'assets/images/venue2.jpg',
      features: ['Douches', 'Cafétéria', 'Pro-Shop']
    },
    {
      id: '3',
      name: 'Complex Sportif',
      location: 'Sousse',
      price: 75,
      rating: 4.7,
      reviews: 156,
      imageUrl: 'assets/images/venue3.jpg',
      features: ['Gradins', 'Restaurant', 'Wifi']
    },
    {
      id: '4',
      name: 'Arena Sports',
      location: 'Bizerte',
      price: 55,
      rating: 4.4,
      reviews: 112,
      imageUrl: 'assets/images/venue4.jpg',
      features: ['Climatisation', 'Bar', 'Équipement']
    },
    {
      id: '5',
      name: 'Olympic Center',
      location: 'Monastir',
      price: 65,
      rating: 4.6,
      reviews: 143,
      imageUrl: 'assets/images/venue5.jpg',
      features: ['Piscine', 'Spa', 'Coaching']
    }
  ];

  ngOnInit() {
    this.checkIfMobile();
    this.startAutoplay();
    this.setupTouchEvents();
    window.addEventListener('resize', this.handleResize);
  }

  ngAfterViewInit() {
    this.calculateMaxIndex();
  }

  ngOnDestroy() {
    this.stopAutoplay();
    window.removeEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    this.checkIfMobile();
    this.calculateMaxIndex();
    if (this.currentIndex > this.maxIndex) {
      this.goToSlide(this.maxIndex);
    }
  };

  private checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  private calculateMaxIndex() {
    const containerWidth = this.venuesContainer.nativeElement.offsetWidth;
    const slidesPerView = this.getSlidesPerView();
    this.maxIndex = Math.max(0, this.venues.length - slidesPerView);
  }

  private getSlidesPerView(): number {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 992) return 2;
    return 3;
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  nextSlide() {
    if (this.currentIndex < this.maxIndex) {
      this.goToSlide(this.currentIndex + 1);
    }
  }

  goToSlide(index: number) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.resetAutoplay();
  }

  getDotArray(): number[] {
    return Array(this.maxIndex + 1).fill(0);
  }

  isSlideVisible(venue: Venue): boolean {
    const index = this.venues.indexOf(venue);
    const slidesPerView = this.getSlidesPerView();
    return index >= this.currentIndex && index < this.currentIndex + slidesPerView;
  }

  private startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (this.currentIndex >= this.maxIndex) {
        this.goToSlide(0);
      } else {
        this.nextSlide();
      }
    }, 5000);
  }

  private resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  private stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  private setupTouchEvents() {
    const element = this.venuesContainer?.nativeElement;
    if (!element) return;

    element.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.touches[0].clientX;
      this.stopAutoplay();
    });

    element.addEventListener('touchend', (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = this.touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
      
      this.startAutoplay();
    });
  }
}
