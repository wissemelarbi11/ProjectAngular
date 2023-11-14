import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEventArgs} from '@syncfusion/ej2-angular-treegrid';
import { Observable, Subject, map } from 'rxjs';
import {DataSourceChangedEventArgs} from "@syncfusion/ej2-grids";
import { TaskModel } from '../models/task-model';
const httpOptions = {headers: new HttpHeaders({
  "Content-Type": "application/json"
}
)};
interface TaskData{
  id:number;
}
@Injectable({
  providedIn: 'root'
})
export class TaskstoreService extends Subject<DataStateChangeEventArgs> {
  private apiUrl = "http://localhost:3000/tasks";
  constructor(private http:HttpClient) { 
    super();
  }
  public execute(state:any): void {
    if(state.requestType === "expand"){
      state.childDataBind();
    } else {
      
    this.getTasks(state).subscribe( x => 
      super.next(x as DataStateChangeEventArgs));
    }
  }
  getTasks(state?: any): Observable<TaskModel[]>{
    return this.http.get<TaskModel[]>(this.apiUrl).pipe(
      map(
        (response: any) =>
        <any>{
          result:
            state.take>0
              ? response.slice(state.skip,state.take)
              : response,
          count: response.length
        }
      )
    );
  }
  addRecord(dataSourceChangedEvent: DataSourceChangedEventArgs) : Observable<TaskModel>{
    return this.http.post<TaskModel>(this.apiUrl,dataSourceChangedEvent.data,httpOptions);

  }
  updateRecord(dataSourceChangedEvent:DataSourceChangedEventArgs):Observable<TaskModel>{
    return this.http.put<TaskModel>(this.apiUrl,dataSourceChangedEvent.data,httpOptions);
  }
  deleteRecord(dataSourceChangedEvent:DataSourceChangedEventArgs):Observable<TaskModel>{
    const id = (dataSourceChangedEvent.data as TaskData[])[0].id;
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<TaskModel>(url,httpOptions);
  }
}
