import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormsComponent } from "../forms/forms.component";

@Component({
  selector: 'demo-app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone:true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsComponent]

})
export class DialogComponent {
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
