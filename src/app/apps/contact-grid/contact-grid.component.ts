import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contact-grid',
  templateUrl: './contact-grid.component.html',
  styleUrls: ['./contact-grid.component.scss'],
})
export class ContactGridComponent implements OnInit {
  breadscrums = [
    {
      title: 'Contact Grid',
      items: ['Apps'],
      active: 'Contact Grid',
    },
  ];
  constructor() {}
  ngOnInit() {}
}
