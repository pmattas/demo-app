import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from "../charts/charts.component";

@Component({
  selector: 'demo-app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
 
})
export class DashboardComponent {

}
