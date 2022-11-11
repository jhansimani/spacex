import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(private http: HttpClient) {}

  getAllLaunches() {
    return this.http.get('https://api.spacexdata.com/v3/launches');
  }
  getUpcomingLaunches() {
    return this.http.get('https://api.spacexdata.com/v3/launches/upcoming');
  }
  getPastLaunches() {
    return this.http.get('https://api.spacexdata.com/v3/launches/past');
  }
  getgetFailedLaunches() {
    return this.http.get('https://api.spacexdata.com/v3/launches').pipe(
      map((response: any) => {
        return response.filter(
          (launch: any) =>
            !launch.launch_success && launch.launch_failure_details
        );
      })
    );
  }
  getSuccessLaunches() {
    return this.http.get('https://api.spacexdata.com/v3/launches').pipe(
      map((response: any) => {
        return response.filter(
          (launch: any) => launch.launch_success && !launch.upcoming
        );
      })
    );
  }
  getLaunches(launchStatus = 'All Launches') {
    if (launchStatus === 'Falied Launches') {
      return this.http.get('https://api.spacexdata.com/v3/launches').pipe(
        map((response: any) => {
          return response.filter(
            (launch: any) =>
              !launch.launch_success && launch.launch_failure_details
          );
        })
      );
    } else if (launchStatus === 'Success Launches') {
      return this.http.get('https://api.spacexdata.com/v3/launches').pipe(
        map((response: any) => {
          return response.filter(
            (launch: any) => launch.launch_success && !launch.upcoming
          );
        })
      );
    } else {
      return this.http.get('https://api.spacexdata.com/v3/launches');
    }
  }
}
