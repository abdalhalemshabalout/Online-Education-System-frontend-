import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { environment} from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DialogformComponent } from '../../shared/components/announcementCard/dialogform.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexStroke,
  ApexLegend,
  ApexMarkers,
  ApexGrid,
  ApexFill,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';

export type avgLecChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

export type pieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public avgLecChartOptions: Partial<avgLecChartOptions>;
  public pieChartOptions: Partial<pieChartOptions>;
  fullName: string;
  teacherId: Number;
  forEachCoursStudentNumber = [];
  totalStudent = 0;
  breadscrums = [
    {
      title: 'Eğitmen Paneli',
      items: ['Eğitmen'],
      active: 'Panel',
    },
  ];
  AcademicianLessons = [];
  generalAnnouncements = [];
  departmentAnnouncements = [];
  lessonsAnnouncements = [];

  constructor(
    private httpClient:HttpClient,
    private authService: AuthService,
    private dialogForm:MatDialog,

  ) {}
  ngOnInit() {

    this.fullName=this.authService.currentUserValue['data']['firstName']+' '+
      this.authService.currentUserValue['data']['lastName'];
    this.teacherId= this.authService.currentUserValue['data']['userId'];
    this.getAllAcademicianLessons();
    this.getForEachCoursStudentNumber();
    this.getGeneralAnnouncements();
    this.getDepartmentAnnouncements();
    this.getLessonsAnnouncements();
    this.chart2();
    this.chart1();
  }
  private chart1() {
    this.avgLecChartOptions = {
      series: [
        {
          name: 'Avg. Lecture',
          data: [65, 72, 62, 73, 66, 74, 63, 67],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {},
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#35fdd8'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,
        colors: ['#FFA41B'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.pieChartOptions = {
      series: this.forEachCoursStudentNumber.map((e) => {
        return Number(e['count']);
      }),
      chart: {
        type: 'donut',
        width: 200,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: this.forEachCoursStudentNumber.map((e) => {
        return e['lessonName'];
      }),
      responsive: [
        {
          breakpoint: 480,
          options: {},
        },
      ],
    };
  }

  //get All Academician Lessons
  public getAllAcademicianLessons(){
    this.httpClient.get(`${environment.apiUrl}/academician/get-academician-lesson`).subscribe(data => {
      this.AcademicianLessons = (data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
    //get get For Each Cours Student Number
  public getForEachCoursStudentNumber(){
    this.httpClient.get(`${environment.apiUrl}/academician/get-total-lesson-students`).subscribe(data => {
      this.forEachCoursStudentNumber =data['data'];
     this.totalStudent= this.forEachCoursStudentNumber.map((e) => {
        return Number(e['count']);
     }).reduce((partialSum, a) => partialSum + a, 0);
      this.forEachCoursStudentNumber = this.forEachCoursStudentNumber.map((e) => {
        return {
          'lessonName': e['lessonName'],
          'count': e['count'],
          'rate': ((Number(e['count']) / this.totalStudent) * 100).toLocaleString('fullwide', {maximumFractionDigits:1})
        }
      });
      // lessonName count
      setTimeout(() => {
        this.chart2();
      }, 500);
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

     //get All Department Announcement
     public getDepartmentAnnouncements(){
      this.httpClient.get(`${environment.apiUrl}/academician/department-announcement`).subscribe(data => {
        this.departmentAnnouncements = (data['data']);
        },
        (err: HttpErrorResponse) => {
       // error code here
      });
    }
    //get Academician Lessons Announcement
    public getLessonsAnnouncements(){
      this.httpClient.get(`${environment.apiUrl}/academician/lessons-announcement`).subscribe(data => {
        this.lessonsAnnouncements = (data['data']);
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
