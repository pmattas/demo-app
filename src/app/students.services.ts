import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { data } from './student';

@Injectable({
  providedIn: 'root',
})
export class Students {
  private studentsData = new BehaviorSubject<any[]>([]);
  currentStudents = this.studentsData.asObservable();
  private showSideBar = new BehaviorSubject<boolean>(true);
  showSideBarState = this.showSideBar.asObservable();
  totalStudents: number = 0;

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
      this.totalStudents = JSON.parse(storedData).length;
    } else {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.studentsData.next(data);
    localStorage.setItem('studentsData', JSON.stringify(data));
    this.totalStudents = data.length;
  }

  addStudent(student: any): void {
    const currentStudents = this.studentsData.value;
    const largestId = currentStudents.reduce((maxId: number, s: any) => {
      return Math.max(maxId, s.id || 0);
    }, 0);
    const newStudent = { ...student, id: largestId + 1 };
    this.studentsData.next([newStudent, ...currentStudents]);
    localStorage.setItem(
      'studentsData',
      JSON.stringify(this.studentsData.value)
    );

    this.totalStudents = this.studentsData.value.length;
  }

  updateStudent(updatedStudent: any): void {
    const currentStudents = JSON.parse(
      localStorage.getItem('studentsData') || '[]'
    );
    const studentIndex = currentStudents.findIndex(
      (student: any) => student.id === updatedStudent.id
    );
    if (studentIndex > -1) {
      currentStudents[studentIndex] = updatedStudent;
    }
    localStorage.setItem('studentsData', JSON.stringify(currentStudents));
  }

  deleteStudents(selectedIds: Set<number>): void {
    const currentStudents = this.studentsData.value;
    const updatedStudents = currentStudents.filter(
      (student: any) => !selectedIds.has(student.id)
    );
    this.studentsData.next(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));

    this.totalStudents = updatedStudents.length;
  }
}
