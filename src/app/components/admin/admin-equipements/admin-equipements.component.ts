import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Equipment {
  id: number;
  name: string;
  category: string;
  description: string;
  status: 'Available' | 'Unavailable';
  image: string;
}

@Component({
  selector: 'app-admin-equipements',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-equipements.component.html',
  styleUrls: ['./admin-equipements.component.css']
})
export class AdminEquipementsComponent implements OnInit {
  equipments: Equipment[] = [
    {
      id: 1,
      name: 'Football',
      category: 'Sports',
      description: 'Professional football',
      status: 'Available',
      image: 'assets/images/football.jpg'
    },
    {
      id: 2,
      name: 'Basketball',
      category: 'Sports',
      description: 'Indoor basketball',
      status: 'Available',
      image: 'assets/images/basketball.jpg'
    }
  ];

  filteredEquipments: Equipment[] = [];
  categories: string[] = ['Sports', 'Gym', 'Swimming', 'Tennis'];
  searchTerm: string = '';
  categoryFilter: string = '';
  showModal: boolean = false;
  editMode: boolean = false;
  equipmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.equipmentForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Available', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.filteredEquipments = this.equipments;
  }

  openAddModal() {
    this.editMode = false;
    this.equipmentForm.reset();
    this.equipmentForm.patchValue({ status: 'Available' });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.equipmentForm.reset();
  }

  editEquipment(equipment: Equipment) {
    this.editMode = true;
    this.equipmentForm.patchValue(equipment);
    this.showModal = true;
  }

  deleteEquipment(id: number) {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipments = this.equipments.filter(e => e.id !== id);
      this.filteredEquipments = this.filteredEquipments.filter(e => e.id !== id);
    }
  }

  saveEquipment() {
    if (this.equipmentForm.valid) {
      const formValue = this.equipmentForm.value;
      if (this.editMode) {
        const index = this.equipments.findIndex(e => e.id === formValue.id);
        this.equipments[index] = { ...this.equipments[index], ...formValue };
      } else {
        const newEquipment: Equipment = {
          id: this.equipments.length + 1,
          ...formValue
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
      return matchesSearch && matchesCategory;
    });
  }
}
