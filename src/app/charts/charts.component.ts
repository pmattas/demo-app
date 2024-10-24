import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { TableComponent } from '../table/table.component';
import { Students } from '../students.services';

interface ChartData {
  name: string;
  y: number;
  sliced: boolean;
}

interface GenderData {
  [key: string]: number;
}

@Component({
  selector: 'demo-app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [TableComponent],
})
export class ChartsComponent implements OnInit {
  @Input() showChart: boolean = false;
  @Output() clickedDataEmitter = new EventEmitter<any[]>();
  @Input() showSideBar: boolean = true;
  @Input() chartData: any[] = [];
  columnChartData: number[] = [];
  clickedData: { name: string; y: number }[] = [];
  genderChartOptions: any;
  totalStudents: number = 0;
  dataChanged = new EventEmitter<void>();
  gpaChartOptions = {
    chart: { type: 'pie' },
    title: {
      text: '<span style="font-size:16px;">GPA</span>',
      align: 'center',
      verticalAlign: 'middle',
      y: 0,
    },
    tooltip: {
      pointFormat:
        '<span style="color:{point.color}">●</span> {series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
        showInLegend: true,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage}%',
        },
        events: {
          click: (event: any) => this.storeClickedData(event.point),
        },
      },
    },
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
    },
    series: [{ data: [] as ChartData[] }],
  };

  constructor(
    private studentsService: Students,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.studentsService.showSideBarState.subscribe((value) => {
      this.showSideBar = value;
    });
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
      const students = JSON.parse(storedData);

      if (Array.isArray(students) && students.length > 0) {
        this.updateChartData(students);
        this.updateGenderChartData(students);
      }
    }
  }

  updateChartData(students: any[]): void {
    const ranges = [
      { name: '0-3.0', count: 0 },
      { name: '3.0-3.2', count: 0 },
      { name: '3.2-3.4', count: 0 },
      { name: '3.4-3.6', count: 0 },
      { name: '3.6-3.8', count: 0 },
      { name: '3.8-4.0', count: 0 },
    ];

    students.forEach((student) => {
      const gpa = student.gpa;
      if (gpa >= 0 && gpa < 3.0) ranges[0].count++;
      else if (gpa >= 3.0 && gpa < 3.2) ranges[1].count++;
      else if (gpa >= 3.2 && gpa < 3.4) ranges[2].count++;
      else if (gpa >= 3.4 && gpa < 3.6) ranges[3].count++;
      else if (gpa >= 3.6 && gpa < 3.8) ranges[4].count++;
      else if (gpa >= 3.8 && gpa <= 4.0) ranges[5].count++;
    });

    this.gpaChartOptions.series[0].data = ranges.map((range) => ({
      name: range.name,
      y: range.count,
      sliced: true,
    }));
  }

  updateGenderChartData(students: any[]): void {
    const genderCounts: GenderData = {
      Male: 0,
      Female: 0,
      Others: 0,
      'Prefer not to say': 0,
    };

    students.forEach((student) => {
      const gender = student.gender || 'Others';
      if (gender in genderCounts) genderCounts[gender]++;
    });

    this.columnChartData = [
      genderCounts['Male'],
      genderCounts['Female'],
      genderCounts['Others'],
      genderCounts['Prefer not to say'],
    ];

    this.genderChartOptions = {
      chart: {
        type: 'column',
        height: '400px',
      },
      title: { text: 'Genders', align: 'center' },
      xAxis: {
        categories: ['Male', 'Female', 'Others', 'Prefer not to say'],
        labels: {
          enabled: false,
        },
      },
      yAxis: {
        min: 0,
        title: { text: 'Number' },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}',
          },
          showInLegend: true,
          pointPadding: 0.2,
          groupPadding: 0.1,
          events: {
            click: (event: any) =>
              this.storeClickedData({
                name: event.point.name,
                y: event.point.y,
              }),
          },
        },
      },
      series: [
        {
          name: 'Male',
          data: [{ name: 'Male', y: genderCounts['Male'] }],
        },
        {
          name: 'Female',
          data: [{ name: 'Female', y: genderCounts['Female'] }],
        },
        {
          name: 'Others',
          data: [{ name: 'Others', y: genderCounts['Others'] }],
        },
        {
          name: 'Prefer not to say',
          data: [
            { name: 'Prefer not to say', y: genderCounts['Prefer not to say'] },
          ],
        },
      ],
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
      },
    };
  }

  storeClickedData(point: any): void {
    console.log('Clicked data:', point);
    this.clickedData = [{ name: point.name, y: point.y }];
    this.clickedDataEmitter.emit(this.clickedData);
    this.cdr.detectChanges();
  }
}
