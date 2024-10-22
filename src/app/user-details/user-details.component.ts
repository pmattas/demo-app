import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserDetailsComponent {
  @Input() initialData: any;
  ngOnInit(): void {
    console.log(this.initialData);
  }
}
