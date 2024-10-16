import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { data } from './student'; 

@Injectable({
  providedIn: 'root',
})
export class Students {
  // private apiUrl = 'https://freetestapi.com/api/v1/students';

  private studentsData = new BehaviorSubject<any[]>([]);
  currentStudents = this.studentsData.asObservable();
  private showSideBar = new BehaviorSubject<boolean>(true); 
  showSideBarState = this.showSideBar.asObservable();

  constructor() {
    this.loadInitialData();
  }

  setShowSideBarState(value: boolean): void {
    this.showSideBar.next(value);
  }

  getShowSideBarState(): boolean {
    return this.showSideBar.value;
  }

  loadInitialData(): void {
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
      this.studentsData.next(JSON.parse(storedData));
    } else {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.studentsData.next(data);
    localStorage.setItem('studentsData', JSON.stringify(data));
  }

  addStudent(student: any): void {
    const currentStudents = this.studentsData.value;
    const largestId = currentStudents.reduce((maxId: number, s: any) => {
      return Math.max(maxId, s.id || 0);
    }, 0);
    const newStudent = { ...student, id: largestId + 1 };
    this.studentsData.next([newStudent, ...currentStudents]);
    localStorage.setItem('studentsData', JSON.stringify(this.studentsData.value));
  }

  updateStudent(updatedStudent: any): void {
    const currentStudents = JSON.parse(localStorage.getItem('studentsData') || '[]');
    const studentIndex = currentStudents.findIndex((student: any) => student.id === updatedStudent.id);
    if (studentIndex > -1) {
      currentStudents[studentIndex] = updatedStudent;
    }
    localStorage.setItem('studentsData', JSON.stringify(currentStudents));
  }
}
