import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TimeSheet } from '../contracts';


const baseUrl = 'https://63d74fd85c4274b136f1fda5.mockapi.io/api/v1';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {

  }

  public fetchTasks(name?: string) {
    this.http.get<Task>(`${baseUrl}/task?name=${name}`);
  }

  public saveTimeSheet(timeSheet: TimeSheet) {
    return this.http.post<TimeSheet>(`${baseUrl}/log`, {
      ...timeSheet
    }).subscribe(console.log);
  }

}
