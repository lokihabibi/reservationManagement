import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Header Stats -->
    <div class="content-header">
        <div class="header-stats">
            <div class="stat-card">
                <i class="fas fa-calendar-check"></i>
                <div class="stat-info">
                    <h3>Active Reservations</h3>
                    <p>24</p>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-tools"></i>
                <div class="stat-info">
                    <h3>Available Equipment</h3>
                    <p>45</p>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-exclamation-circle"></i>
                <div class="stat-info">
                    <h3>Pending Requests</h3>
                    <p>12</p>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-clock"></i>
                <div class="stat-info">
                    <h3>Maintenance Due</h3>
                    <p>5</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Dashboard Content -->
    <div class="content-body">
        <div class="row">
            <!-- Recent Reservations -->
            <div class="col-lg-8">
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>Recent Reservations</h3>
                        <button class="btn btn-primary btn-sm">View All</button>
                    </div>
                    <div class="card-body">
                        <div class="reservation-list">
                            <div class="reservation-item">
                                <div class="reservation-info">
                                    <h4>Equipment A</h4>
                                    <p>Reserved by John Doe</p>
                                    <span class="badge bg-primary">In Progress</span>
                                </div>
                                <div class="reservation-date">
                                    <p>Start: 20 Jan 2025</p>
                                    <p>End: 25 Jan 2025</p>
                                </div>
                            </div>
                            <div class="reservation-item">
                                <div class="reservation-info">
                                    <h4>Equipment B</h4>
                                    <p>Reserved by Jane Smith</p>
                                    <span class="badge bg-warning">Pending</span>
                                </div>
                                <div class="reservation-date">
                                    <p>Start: 22 Jan 2025</p>
                                    <p>End: 24 Jan 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [`
    .header-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-card i {
      font-size: 2rem;
      color: #4a90e2;
    }

    .stat-info h3 {
      margin: 0;
      font-size: 0.9rem;
      color: #666;
    }

    .stat-info p {
      margin: 0.5rem 0 0;
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }

    .dashboard-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 1rem;
    }

    .card-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h3 {
      margin: 0;
    }

    .card-body {
      padding: 1rem;
    }

    .reservation-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .reservation-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 4px;
    }

    .reservation-info h4 {
      margin: 0;
      color: #333;
    }

    .reservation-info p {
      margin: 0.5rem 0;
      color: #666;
    }

    .badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .bg-primary {
      background: #4a90e2;
      color: white;
    }

    .bg-warning {
      background: #f5a623;
      color: white;
    }

    .reservation-date p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class ManagerHomeComponent {
}
