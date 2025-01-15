import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Venue } from '../../shared/types/venue.interface';

@Component({
  selector: 'app-venue-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="venue-card">
      <div class="venue-image">
        <img [src]="venue.imageUrl" [alt]="venue.name">
        <div class="venue-price">{{ venue.price }}DT/H</div>
      </div>
      <div class="venue-content">
        <div class="venue-info">
          <h3 class="venue-name">{{ venue.name }}</h3>
          <div class="venue-location">
            <i class="fas fa-map-marker-alt"></i>
            {{ venue.location }}
          </div>
          <div class="venue-rating">
            <div class="stars">
              <i class="fas fa-star"></i>
              <span>{{ venue.rating }}</span>
            </div>
            <div class="reviews">({{ venue.reviews }} avis)</div>
          </div>
          <div class="venue-features-wrapper">
            <div class="venue-features">
              @for (feature of venue.features; track feature) {
                <span class="feature">{{ feature }}</span>
              }
            </div>
          </div>
        </div>
        <button class="btn-book">Réserver maintenant</button>
      </div>
    </div>
  `,
  styles: [`
    .venue-card {
      background: var(--card-bg);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 500px;
      display: flex;
      flex-direction: column;
    }

    .venue-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .venue-image {
      position: relative;
      height: 200px;
      flex-shrink: 0;
      overflow: hidden;
    }

    .venue-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .venue-card:hover .venue-image img {
      transform: scale(1.05);
    }

    .venue-price {
      position: absolute;
      top: 16px;
      right: 16px;
      background: var(--primary);
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .venue-content {
      padding: 20px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .venue-info {
      flex-grow: 1;
    }

    .venue-name {
      margin: 0 0 8px;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 2.8em;
    }

    .venue-location {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
      margin-bottom: 12px;
      font-size: 0.9rem;
    }

    .venue-location i {
      color: var(--primary);
      flex-shrink: 0;
    }

    .venue-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .stars {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #ffc107;
    }

    .reviews {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .venue-features-wrapper {
      margin-bottom: 20px;
      height: 32px;
      overflow: hidden;
    }

    .venue-features {
      display: flex;
      gap: 8px;
      white-space: nowrap;
      overflow-x: hidden;
      mask-image: linear-gradient(to right, black 80%, transparent);
      -webkit-mask-image: linear-gradient(to right, black 80%, transparent);
    }

    .feature {
      background: var(--bg-secondary);
      color: var(--text-secondary);
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.85rem;
      display: inline-block;
    }

    .btn-book {
      width: 100%;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: auto;
    }

    .btn-book:hover {
      background: var(--primary-dark);
    }

    @media (max-width: 768px) {
      .venue-card {
        height: 450px;
      }

      .venue-image {
        height: 180px;
      }

      .venue-content {
        padding: 16px;
      }

      .venue-name {
        font-size: 1.1rem;
        height: 2.4em;
      }

      .venue-features-wrapper {
        height: 28px;
      }
    }
  `]
})
export class VenueCardComponent {
  @Input({ required: true }) venue!: Venue;
}
