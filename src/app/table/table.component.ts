import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
} from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Students } from '../students.services';
import { DialogComponent } from '../dialog/dialog.component';
import {
  PaginationNumberFormatterParams,
  RowSelectedEvent,
} from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'demo-app-table',
  standalone: true,
  imports: [AgGridModule, DialogComponent, CommonModule, EditComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TableComponent implements OnInit {
  private gridApi: any;
  pagination = true;
  paginationPageSize = 10;
  paginationSizeSelector = [10, 20, 40];
  rowData: any[] = [];
  filteredRowData: any[] = [];
  selectedRowData: any;
  @Input() showSideBar: boolean = true;
  nameElement: any;

  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams
  ) => string = (params: PaginationNumberFormatterParams) => {
    return params.value.toLocaleString();
  };

  @Input() set data(value: any[]) {
    this.rowData = value;
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }

  columnDefs = [
    { headerCheckboxSelection: false, checkboxSelection: true, flex: 1 },
    { headerName: 'S N', valueGetter: 'node.rowIndex + 1', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'gpa', headerName: 'GPA', flex: 1, sortable: true },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'phone', headerName: 'Phone', flex: 2 },
  ];

  constructor(
    private studentsService: Students,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.studentsService.showSideBarState.subscribe((value) => {
      this.showSideBar = value;
    });
    this.studentsService.currentStudents.subscribe((data) => {
      this.rowData = data;
      this.filteredRowData = data;
      if (this.gridApi) {
        this.gridApi.setRowData(this.filteredRowData);
      }
    });
    this.nameElement =
      this.el.nativeElement.querySelector('.clicked-data-name');
  }

  refreshData(): void {
    this.renderer.setProperty(this.nameElement, 'innerHTML', '');
    this.studentsService.fetchData();
  }

  resetData(): void {
    this.renderer.setProperty(this.nameElement, 'innerHTML', '');
    this.renderer.setProperty(this.nameElement, 'innerHTML', ` `);
    const storedData = JSON.parse(localStorage.getItem('studentsData') || '[]');
    this.rowData = storedData;
    this.filteredRowData = storedData;
    if (this.gridApi) {
      this.gridApi.setRowData(this.filteredRowData);
    }
  }
  onRowSelected(event: RowSelectedEvent): void {
    const isSelected = event.node.isSelected();

    if (isSelected) {
      this.selectedRowData = { ...event.data };
      console.log('Row selected:', this.selectedRowData);
    } else {
      if (this.selectedRowData && this.selectedRowData.id === event.data.id) {
        this.selectedRowData = null;
        console.log('Row deselected:', event.data);
      }
    }
    this.cdr.detectChanges();
  }

  deleteStudent(id: any): void {
    if (id === null || id === undefined) return;
    const currentStudents = JSON.parse(
      localStorage.getItem('studentsData') || '[]'
    );
    const updatedStudents = currentStudents.filter(
      (student: any) => student.id !== id
    );
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
    this.rowData = updatedStudents;
    this.filteredRowData = updatedStudents;
    if (this.gridApi) {
      this.gridApi.setRowData(this.filteredRowData);
    }
    this.cdr.detectChanges();
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.gridApi.setQuickFilter(filterValue);
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.rowData);
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.paginationPageSize = Number(selectElement.value);
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(this.paginationPageSize);
    }
  }

  reloadTableData(): void {
    const storedData = JSON.parse(localStorage.getItem('studentsData') || '[]');
    this.rowData = storedData;
    this.filteredRowData = storedData;
    if (this.gridApi) {
      this.gridApi.setRowData(this.filteredRowData);
    }
  }
}
