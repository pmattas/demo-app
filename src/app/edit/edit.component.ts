import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from '../forms/forms.component';

@Component({
  selector: 'demo-app-edit',
  standalone: true,
  imports: [CommonModule, FormsComponent],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditComponent {
  isActive = false;
  @Input() studentData: any;

  ngOnChanges() {
    if (this.studentData) {
      console.log('Selected Student Data:', this.studentData);
    }
  }
  onFormSubmit(success: boolean): void {
    if (success) {
      this.isActive = false;
      console.log('this.isActive');
    }
  }
  toggleActive(): void {
    this.isActive = true;
  }
}
