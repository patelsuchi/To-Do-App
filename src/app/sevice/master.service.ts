import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponceModel, Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl = 'https://freeapi.gerasim.in/api/JWT/';

  constructor(private http: HttpClient) {}

  getAllTaskList(): Observable<ApiResponceModel> {
    return this.http.get<ApiResponceModel>(this.apiUrl + 'GetAllTaskList');
  }

  addNewTask(obj:Task): Observable<ApiResponceModel> {
    return this.http.post<ApiResponceModel>(this.apiUrl + 'CreateNewTask',obj)
  }
  updateTask(obj:Task): Observable<ApiResponceModel> {
    return this.http.put<ApiResponceModel>(this.apiUrl + 'UpdateTask',obj)
  }
 deleteTask(id:number): Observable<ApiResponceModel> {
    return this.http.delete<ApiResponceModel>(this.apiUrl + 'DeleteTask?itemId='+ id)
  }
}
