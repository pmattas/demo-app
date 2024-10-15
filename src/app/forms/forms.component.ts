import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import '@en-text-field';
import { Students } from '../students.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'demo-app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormsComponent {
  @Output() formSubmit = new EventEmitter<boolean>();
  @Input() initialData: any;

  additionForm: FormGroup;

  constructor(private studentsService: Students, private router: Router) {
    this.additionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]*([ ]+[A-Za-z]*)*$'), Validators.minLength(3)]),
      gender: new FormControl(''),
      age: new FormControl('', [Validators.required, Validators.min(16), Validators.max(25)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^\\d{3}[-\\s]?\\d{3}[-\\s]?\\d{4}$')]),
      courses: new FormControl('', Validators.required),
      gpa: new FormControl('', [Validators.required, Validators.min(0), Validators.max(4)])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.patchFormWithInitialData();
    }
  }

  patchFormWithInitialData(): void {
    if (this.initialData) {
      const address = this.initialData.address;
      const addr = address.street + ' ' + address.city + ' ' + address.zip + ' ' + address.country;
      if (address && typeof address === 'object') {
        this.initialData.address = addr;
      }
      this.additionForm.patchValue(this.initialData);
    }
  }

  onSubmit(): void {
    if (this.additionForm.valid) {
      const formValue = this.additionForm.value;
      if (this.initialData?.id) {
        formValue.id = this.initialData.id; 
        this.studentsService.updateStudent(formValue); 
      } else {
        this.studentsService.addStudent(formValue); 
      }
      this.formSubmit.emit(true);
    } else {
      this.additionForm.markAllAsTouched();
      this.formSubmit.emit(true);
    }
  }
}
