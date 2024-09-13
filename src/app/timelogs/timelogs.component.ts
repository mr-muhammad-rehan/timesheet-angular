import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';


interface Task {
  createdAt: Date,
  name: string,
  id: number
}

interface TimeSheet {
  task: any;
  start: string;
  end: string;
}


const baseUrl = 'https://63d74fd85c4274b136f1fda5.mockapi.io/api/v1';

@Component({
  selector: 'app-timelogs',
  templateUrl: './timelogs.component.html',
  styleUrls: ['./timelogs.component.scss']
})
export class TimelogsComponent implements OnInit {

  timesheetFormGroup = new FormGroup({
    task: new FormControl('', Validators.required),
    timeStart: new FormControl('', Validators.required),
    timeEnd: new FormControl('', Validators.required),
  });

  public tasks: Task[] = [];

  constructor(private http: HttpClient, private timeSheet: HttpService ) {

  }
  ngOnInit(): void {
  }




  public onSubmit() {
    console.log(this.timesheetFormGroup.value);
    const payload = {
      task: this.timesheetFormGroup.value.task,
      start: this.timesheetFormGroup.value.timeStart,
      end: this.timesheetFormGroup.value.timeEnd
    } as TimeSheet;

    this.saveTimeSheet(payload);
  }

  public filterTasks(event: any) {
    this.fetchTasks(event?.query);
  }

  public getTaskName(): string[] {
    return this.tasks.map(t => t.name);
  }



  private fetchTasks(name?: string) {
    this.http.get(`${baseUrl}/task?name=${name}`).subscribe(res => {
      this.tasks = res as Task[];
    });
  }

  private saveTimeSheet(timeSheet: TimeSheet) {
    return this.http.post<TimeSheet>(`${baseUrl}/log`, {
      ...timeSheet
    }).subscribe(console.log);
  }

}
