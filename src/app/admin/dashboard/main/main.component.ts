import { map } from 'rxjs/operators';
import { environment} from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogformComponent } from '../../../shared/components/announcementCard/dialogform.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexFill,
  ApexResponsive,
  ApexTheme,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';
import { ThisReceiver } from '@angular/compiler';
import { throws } from 'assert';
export type chartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  legend: ApexLegend;
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  colors: string[];
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  series2: ApexNonAxisChartSeries;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public areaChartOptions: Partial<chartOptions>;
  public barChartOptions: Partial<chartOptions>;
  public polarChartOptions: Partial<chartOptions>;
  breadscrums = [
    {
      title: 'Control Panel',
      items: [],
      active: 'Control Panel 1',
    },
  ];
  totalNumber = [];
  studentNumberOfYear = [];
  studentNumberOfYearCount = [];
  studentOfDepartment = [];
  totalStudentNumber = 0;
  topAcademician = [];
  topDeparmentOfHead = [];
  topStudentInfo = [];
  academicianOfDepartment = [];
  generalAnnouncements= [];
  totalAcademicianNumber = 0;
  url=environment.imgUrl;


  constructor(
    private dialogForm:MatDialog,
    private httpClient: HttpClient,
  ) {}

  ngOnInit() {
    // this.getTotal();
    // this.getStudentOfYearTotal();
    // this.getStudentOfDepartment();
    // this.getTopAcademicianInfo();
    // this.getDepartmentOfHead();
    // this.getTopStudentInfo();
    // this.getAcademicianOfDepartment();
    // this.getGeneralAnnouncements();
    // this.chart3();
    // this.chart2();
    // this.chart1();
  }
  // get Academician Of Department
  public chart1() {
    this.areaChartOptions = {
      series2: this.academicianOfDepartment.map((e) => {
        return Number(e['count']);
      }),
      chart: {
        type: 'pie',
        width: 300,
      },
      legend: {
        show: false,
        position: 'bottom',
      },
      dataLabels: {
        enabled: true,
      },
      labels: this.studentOfDepartment.map((e) => {
        return e['departmentName'];
      }),
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  // get Student Of Year Total
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Öğrenci Sayısı',
          data: this.studentNumberOfYearCount,
        },
      ],
      chart: {
        height: 400,
        type: 'bar',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '';
        },
        offsetY: -20,
        style: {
          fontSize: '15px',
          colors: ['#9aa0ac'],
        },
      },

      xaxis: {
        categories:this.studentNumberOfYear,
        position: 'bottom',
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        colors: ['#4F86F8', '#4F86F8'],
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + '';
          },
        },
      },
    };
  }
  // get Student Of Department
  public chart3() {
    this.polarChartOptions = {
      series2: this.studentOfDepartment.map((e) => {
        return Number(e['count']);
      }),
      chart: {
        type: 'pie',
        width: 300,
      },
      legend: {
        show: false,
        position: 'bottom',
      },
      dataLabels: {
        enabled: false,
      },
      labels: this.studentOfDepartment.map((e) => {
        return e['departmentName'];
      }),
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  // get Student Total
  public getTotal(){
    this.httpClient.get(`${environment.apiUrl}/personal/total`).subscribe(data => {
      this.totalNumber = (data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // get Student Total
  public getStudentOfYearTotal(){
    this.httpClient.get(`${environment.apiUrl}/personal/of-year-total`).subscribe(data => {
      this.studentNumberOfYear = data['data'].map((e) => {
        return e['year'];
      });
      this.studentNumberOfYearCount = data['data'].map((e) => {
        return (e['count']);
      });
      this.chart2();
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // get Student Of Department
  public getAcademicianOfDepartment(){
    this.httpClient.get(`${environment.apiUrl}/personal/academician-total-of-department`).subscribe(data => {
      this.academicianOfDepartment = data['data'];
      data['data'].forEach(element => {
        this.totalAcademicianNumber += Number(element['count']);
      });
      this.chart1();
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // get Student Of Department
  public getStudentOfDepartment(){
    this.httpClient.get(`${environment.apiUrl}/personal/student-total-of-department`).subscribe(data => {
      this.studentOfDepartment = data['data'];
      data['data'].forEach(element => {
        this.totalStudentNumber += Number(element['count']);
      });
      this.chart3();
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // get Top Academician Info
  public getTopAcademicianInfo(){
    this.httpClient.get(`${environment.apiUrl}/personal/top-academician`).subscribe(data => {
      this.topAcademician = data['data'];
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // get Department Of Head
  public getDepartmentOfHead(){
    this.httpClient.get(`${environment.apiUrl}/personal/top-department-of-head`).subscribe(data => {
      this.topDeparmentOfHead = (data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // get Top Student Info
  public getTopStudentInfo(){
    this.httpClient.get(`${environment.apiUrl}/personal/top-student`).subscribe(data => {
      this.topStudentInfo = data['data'];
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
      //get All Announcement
      public getGeneralAnnouncements(){
        this.httpClient.get(`${environment.apiUrl}/academician/get-announcements`).subscribe(data => {
          this.generalAnnouncements = (data['data']);
          },
          (err: HttpErrorResponse) => {
         // error code here
        });
  }
    openAnnouncementCardDialog(Announcement): void {
      let tempDirection;
      if (localStorage.getItem('isRtl') === 'true') {
        tempDirection = 'rtl';
      } else {
        tempDirection = 'ltr';
      }
      const dialogReform = this.dialogForm.open(DialogformComponent, {
        width: '640px',
        disableClose: true,
        direction: tempDirection,
        data: {
        'announcement':Announcement,
        }
    });
  }
}
