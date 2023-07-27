import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { environment} from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';

export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

export type pieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
};

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public barChartOptions: Partial<barChartOptions>;
  public areaChartOptions: Partial<areaChartOptions>;
  public pieChartOptions: Partial<pieChartOptions>;

  fullName:string;

  breadscrums = [
    {
      title: 'Panel',
      items: ['Öğrenci'],
      active: 'Panel',
    },
  ];
  StudentLessons = [];
  DepartmentBooks = [];
  generalAnnouncements = [];
  departmentAnnouncements = [];
  lessonsAnnouncements = [];
  totalContents = [];
  homeworkName = '';
  homeworkStartDate = '';

  examName = '';
  examStartDate = '';
  constructor(
    private httpClient:HttpClient,
    private authService: AuthService,
    private dialogForm:MatDialog,
  ) {}

  // // Doughnut chart start
  // public doughnutChartLabels: string[] = [
  //   'Development',
  //   'Java Classes',
  //   'Painting ',
  //   'Geography Class',
  // ];
  // public doughnutChartData: number[] = [32, 25, 20, 23];
  // public doughnutChartColors: any[] = [
  //   {
  //     backgroundColor: ['#5A5FAF', '#F7BF31', '#EA6E6C', '#28BDB8'],
  //   },
  // ];

  // public doughnutChartType = 'doughnut';
  // public doughnutChartOptions: any = {
  //   animation: false,
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   cutoutPercentage: 70,
  //   legend: {
  //     display: false,
  //   },
  // };

  // Doughnut chart end

  ngOnInit() {
    this.fullName=this.authService.currentUserValue.firstName+' '+
    this.authService.currentUserValue.lastName;
    // this.getAllDepartmentBooks();
    // this.getLastAddedExam();
    // this.getLastAddedHomework();
    // this.getAllStudentLessons();
    // this.getGeneralAnnouncements();
    // this.getDepartmentAnnouncements();
    // this.getLessonsAnnouncements();
    // this.getTotalContentInLessons();
    // this.chart3();
  }



// Department All Books
public getAllStudentLessons(){
  this.httpClient.get(`${environment.apiUrl}/student/get-student-lesson`).subscribe(data => {
      this.StudentLessons = (data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

  // Department All Books
  public getAllDepartmentBooks(){
  this.httpClient.get(`${environment.apiUrl}/student/get-department-books`).subscribe(data => {
      this.DepartmentBooks = (data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

  // Last Added Exam
  public getLastAddedExam(){
    this.httpClient.get(`${environment.apiUrl}/student/get-last-added-exam`).subscribe(data => {
        this.examName = (data['data'][0].examName);
        this.examStartDate = (data['data'][0].startDate);
        },
        (err: HttpErrorResponse) => {
       // error code here
      });
  }

  // Last Added Exam
  public getLastAddedHomework(){
    this.httpClient.get(`${environment.apiUrl}/student/get-last-added-homework`).subscribe(data => {
      this.homeworkName = (data['data'][0].name);
      this.homeworkStartDate = (data['data'][0].startDate);
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
      this.httpClient.get(`${environment.apiUrl}/student/department-announcement`).subscribe(data => {
        this.departmentAnnouncements = (data['data']);
        },
        (err: HttpErrorResponse) => {
       // error code here
      });
    }
    //get student Lessons Announcement
    public getLessonsAnnouncements(){
      this.httpClient.get(`${environment.apiUrl}/student/lessons-announcement`).subscribe(data => {
        this.lessonsAnnouncements = (data['data']);
        },
        (err: HttpErrorResponse) => {
       // error code here
      });
    }

     //get student Lessons Announcement
     public getTotalContentInLessons(){
      this.httpClient.get(`${environment.apiUrl}/student/total-content-lessons`).subscribe(data => {
        this.totalContents = (data['data']);
        // Content count
        this.chart3();
        },

        (err: HttpErrorResponse) => {
       // error code here
      });
    }
    private chart3() {
      this.pieChartOptions = {
        series: this.totalContents.map((e) => {
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
        labels: this.totalContents.map((e) => {
          return (e['lessonName']);
        }),
        responsive: [
          {
            breakpoint: 480,
            options: {},
          },
        ],
      };
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
