import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Students } from '../students.services';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'demo-app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule]
})
export class NavigationComponent {
  showSideBar = true;
  constructor(
    private cdref: ChangeDetectorRef,
    private studentsService: Students
  ) {}
  ngOnInit(): void {
    this.studentsService.showSideBarState.subscribe((value) => {
      this.showSideBar = value;
    });
  }
  onClick(): void {
    this.showSideBar = !this.showSideBar;
    console.log(this.showSideBar);
    this.studentsService.setShowSideBarState(this.showSideBar);
  }
  navigateToLogin(): void {
    window.dispatchEvent(
      new CustomEvent('navigate-to', {
        detail: {
          path: '/login',
        },
      })
    );
  }
}
