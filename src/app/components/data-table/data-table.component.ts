import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LaunchService } from 'src/app/services/launch/launch.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() data: any;
  @Input() rows: number = 10;
  @Input() isLoading: boolean = false;
  @Output() selectedLaunch = new EventEmitter();
  columns = [1, 2, , 3, 4, 5, 6];
  first = 0;

  constructor(private launchService: LaunchService) {}

  ngOnInit(): void {}
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.data ? this.first === this.data.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.data ? this.first === 0 : true;
  }
  display = false;
  launch: any;
  onClick(launch: any) {
    this.display = true;
    this.launch = launch;
    this.selectedLaunch.emit(launch);
  }
}
