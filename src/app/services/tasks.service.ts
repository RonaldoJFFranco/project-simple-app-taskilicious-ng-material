import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  route = 'https://63761992b5f0e1eb850298da.mockapi.io/'
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(`${this.route}tasks`).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }

  getById(taskId: string){
    return this.http.get<any>(`${this.route}tasks/${taskId}`).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }

  getTeamMembers(){
    return this.http.get<any>(`${this.route}team-members`).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }

  addNew(newTask: Task){
    return this.http.post<any>(`${this.route}tasks`, newTask).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }

  editById(task: Task){
    return this.http.put<any>(`${this.route}tasks/${task.id}`, task).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }

  removeById(taskId: any){
    return this.http.delete<any>(`${this.route}tasks/${taskId}`).pipe(
      map((resp)=>{
        return resp;
      })
    )
  }
}
