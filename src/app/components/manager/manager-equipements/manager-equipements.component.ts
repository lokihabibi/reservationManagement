import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Equipment {
  id: number;
  name: string;
  category: string;
  description: string;
  status: 'Available' | 'In Use' | 'Maintenance';
  image: string;
  nextMaintenance?: Date;
  lastReservation?: Date;
  reservedBy?: string;
}

@Component({
  selector: 'app-manager-equipements',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manager-equipements.component.html',
  styleUrls: ['./manager-equipements.component.css']
})
export class ManagerEquipementsComponent implements OnInit {
  equipments: Equipment[] = [
    {
      id: 1,
      name: 'Football',
      category: 'Sports',
      description: 'Professional football',
      status: 'Available',
      image: 'assets/images/football.jpg',
      nextMaintenance: new Date('2025-02-15')
    },
    {
      id: 2,
      name: 'Basketball',
      category: 'Sports',
      description: 'Indoor basketball',
      status: 'In Use',
      image: 'assets/images/basketball.jpg',
      nextMaintenance: new Date('2025-02-20'),
      lastReservation: new Date('2025-01-15'),
      reservedBy: 'John Doe'
    },
    {
      id: 3,
      name: 'Treadmill',
      category: 'Gym',
      description: 'Professional treadmill',
      status: 'Maintenance',
      image: 'assets/images/treadmill.jpg',
      nextMaintenance: new Date('2025-01-25')
    }
  ];

  filteredEquipments: Equipment[] = [];
  categories: string[] = ['Sports', 'Gym', 'Swimming', 'Tennis', 'Athletics'];
  searchTerm: string = '';
  categoryFilter: string = '';
  statusFilter: string = '';
  showModal: boolean = false;
  editMode: boolean = false;
  equipmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.equipmentForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['Available', Validators.required],
      image: ['', Validators.required],
      nextMaintenance: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.filteredEquipments = this.equipments;
  }

  openAddModal() {
    this.editMode = false;
    this.equipmentForm.reset();
    this.equipmentForm.patchValue({ 
      status: 'Available',
      nextMaintenance: this.getDefaultMaintenanceDate()
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.equipmentForm.reset();
  }

  editEquipment(equipment: Equipment) {
    this.editMode = true;
    this.equipmentForm.patchValue({
      //id: equipment.id,
      ...equipment,
      nextMaintenance: equipment.nextMaintenance ? 
        this.formatDate(equipment.nextMaintenance) : 
        this.getDefaultMaintenanceDate()
    });
    this.showModal = true;
  }

  deleteEquipment(id: number) {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipments = this.equipments.filter(e => e.id !== id);
      this.filterEquipments();
    }
  }

  saveEquipment() {
    if (this.equipmentForm.valid) {
      const formValue = this.equipmentForm.value;
      const equipment: Equipment = {
        ...formValue,
        nextMaintenance: new Date(formValue.nextMaintenance)
      };

      if (this.editMode) {
        const index = this.equipments.findIndex(e => e.id === equipment.id);
        if (index !== -1) {
          this.equipments[index] = equipment;
        }
      } else {
        const newEquipment: Equipment = {
          ...equipment,
          id: this.getNextId()
        };
        this.equipments.push(newEquipment);
      }
      this.filterEquipments();
      this.closeModal();
    }
  }

  filterEquipments() {
    this.filteredEquipments = this.equipments.filter(equipment => {
      const matchesSearch = equipment.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          equipment.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.categoryFilter || equipment.category === this.categoryFilter;
      const matchesStatus = !this.statusFilter || equipment.status === this.statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  reserveEquipment(equipment: Equipment) {
    if (equipment.status !== 'Available') {
      alert('This equipment is not available for reservation');
      return;
    }

    if (confirm(`Do you want to reserve ${equipment.name}?`)) {
      const index = this.equipments.findIndex(e => e.id === equipment.id);
      this.equipments[index] = {
        ...equipment,
        status: 'In Use',
        lastReservation: new Date(),
        reservedBy: 'Current User' // Replace with actual user name from auth service
      };
      this.filterEquipments();
    }
  }

  scheduleMaintenanceCheck() {
    const today = new Date();
    this.equipments.forEach(equipment => {
      if (equipment.nextMaintenance && new Date(equipment.nextMaintenance) <= today) {
        equipment.status = 'Maintenance';
      }
    });
    this.filterEquipments();
  }

  private getNextId(): number {
    return Math.max(...this.equipments.map(e => e.id), 0) + 1;
  }

  private getDefaultMaintenanceDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return this.formatDate(date);
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  // Track by function for ngFor optimization
  trackById(index: number, item: Equipment): number {
    return item.id;
  }
}
