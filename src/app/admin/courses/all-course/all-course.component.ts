import { Course } from './course.model';
import { CourseService } from './courses.service';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatSort } from '@angular/material/sort';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from './../../../shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.sass'],
})
export class AllCourseComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    'select',
    'className',
    'branchName',
    'name',
    'code',
    'timer',
    'detaily',
    'actions',
  ];
  exampleDatabase: CourseService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Course>(true, []);
  id: number;
  course: Course | null;
  allCourse = [];
    breadscrums = [
    {
      title: 'All Courses',
      items: ['Course'],
      active: 'Full',
    },
  ];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public courseService: CourseService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

  //Add Lesson
  addNew() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        course: this.course,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.unshift(
          this.courseService.getDialogData()
        );
        setTimeout(() => {
          this.loadData();
        }, 100);
        this.showNotification(
          'snackbar-success',
          'lesson added successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  //Update Lesson Information
  editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        course: row,
        action: 'edit',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.courseService.getDialogData();
        // // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          'black',
          'lesson has been modified successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  //Delete Lesson
  deleteItem(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection,
      width: '350px',
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'lesson has been removed successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Course>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + 'lesson has been removed successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new CourseService(this.httpClient,this.snackBar);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Course) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Course> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Course[] = [];
  renderedData: Course[] = [];
  constructor(
    public exampleDatabase: CourseService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Course[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCourses();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((course: Course) => {
            const searchStr = (
              course.branchName +
              course.className +
              course.name +
              course.code +
              course.timer +
              course.detaily
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: Course[]): Course[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'branchName':
          [propertyA, propertyB] = [a.branchName, b.branchName];
          break;
        case 'className':
          [propertyA, propertyB] = [a.className, b.className];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'code':
          [propertyA, propertyB] = [a.code, b.code];
          break;
        case 'timer':
          [propertyA, propertyB] = [a.timer, b.timer];
          break;
        case 'detaily':
          [propertyA, propertyB] = [a.detaily, b.detaily];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
