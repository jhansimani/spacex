import { Component, OnInit } from '@angular/core';
import { LaunchService } from './services/launch/launch.service';
import { of, take } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'spaceX';
  allLaunches: any;
  categories = [
    'All Launches',
    'Upcoming Launches',
    'Falied Launches',
    'Success Launches',
  ];
  first = 0;

  rows = 10;
  loadFlag = false;
  numbers: number[] = [];
  numberObservable: any;
  constructor(private launchService: LaunchService) {}
  ngOnInit() {
    this.loadFlag = true;
    this.rows = 1;
    this.launchService.getAllLaunches().subscribe((data) => {
      this.allLaunches = data;
      this.rows = 10;
      this.loadFlag = false;
      // setTimeout(() => {

      // }, 10000);
    });

    for (let i = 1; i <= 300; i++) {
      this.numbers.push(i);
    }
    this.numberObservable = of([...this.numbers]);
  }

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
    return this.allLaunches
      ? this.first === this.allLaunches.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.allLaunches ? this.first === 0 : true;
  }
  isOpened = false;
  launch: any;
  selectedCategory: any;
  onCategoryClick(selectedCategory: any) {
    if (selectedCategory === 'Upcoming Launches') {
      this.loadFlag = true;
      this.rows = 1;
      this.launchService.getUpcomingLaunches().subscribe((data: any) => {
        this.allLaunches = data;
        this.rows = 10;
        this.loadFlag = false;
      });
    } else {
      this.loadFlag = true;
      this.rows = 1;
      this.launchService
        .getLaunches(selectedCategory)
        .subscribe((data: any) => {
          this.allLaunches = data;
          this.rows = 10;
          this.loadFlag = false;
        });
    }
  }
  filterOptions = [
    {
      name: 'Past 6 Months',
      code: 6,
    },
    {
      name: 'Past 12 Months',
      code: 12,
    },
    {
      name: 'Past 18 Months',
      code: 18,
    },
    {
      name: 'Past 24 Months',
      code: 24,
    },
    {
      name: 'Past 36 Months',
      code: 36,
    },
  ];
  selectedLaunch(launch: any) {
    this.isOpened = true;
    this.launch = launch;
  }
  filterOption: any;
  onFilterOption(filterOption: any) {
    const date = new Date();
    console.log('current Date', date);
    const pastDate = new Date(
      new Date().setMonth(date.getMonth() - filterOption.code)
    );
    console.log('Past date', pastDate);
    this.allLaunches = this.allLaunches.filter((launch: any) => {
      if (
        new Date(launch.launch_date_utc) < new Date(date) &&
        new Date(launch.launch_date_utc) > new Date(pastDate)
      ) {
        return launch;
      }
    });
    console.log(this.allLaunches);
  }
}
