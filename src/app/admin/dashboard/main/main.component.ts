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
  totalNumber;
  Announcements= [];
  Teachers = [];

  constructor(
    private dialogForm:MatDialog,
    private httpClient: HttpClient,
  ) {}

  ngOnInit() {
      this.getTotal();
      this.getAnnouncements();
      this.getTeachers();
  }

  // get Student Total
  public getTotal(){
    this.httpClient.get(`${environment.apiUrl}/total`).subscribe(data => {
      this.totalNumber = data;
      console.log(data);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

  //get All Announcement
  public getAnnouncements(){
    this.httpClient.get(`${environment.apiUrl}/announcements`).subscribe(data => {
      this.Announcements = (data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

  //get All Teachers
  public getTeachers(){
    this.httpClient.get(`${environment.apiUrl}/teachers`).subscribe(data => {
      this.Teachers = (data['data']);
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
