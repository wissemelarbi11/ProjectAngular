import { Component, OnInit } from '@angular/core';
import { DataStateChangeEventArgs, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-treegrid';
import { Observable } from 'rxjs';
import {DataSourceChangedEventArgs} from "@syncfusion/ej2-grids";
import { TaskstoreService } from 'src/app/Services/taskstore.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public editSettings!: EditSettingsModel;
  public toolbar!: ToolbarItems[];
  public tasks: Observable<DataStateChangeEventArgs>;
  constructor(private TaskService: TaskstoreService){
    this.tasks = TaskService;
  }
  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.TaskService.execute(state);
  }
  ngOnInit(): void {
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode:"Row",
      newRowPosition:"Below"};
    this.toolbar =["Add","Edit","Delete","Update","Cancel"];
    const state: any = { skip:0, take:10};
    this.TaskService.execute(state);
  }
  public dataSourceChanged(dataSourceChangedEvent:DataSourceChangedEventArgs):void{
    if(dataSourceChangedEvent.action === "add"){
     this.TaskService.addRecord(dataSourceChangedEvent).subscribe(() =>{
      if (dataSourceChangedEvent.endEdit){
      dataSourceChangedEvent.endEdit();
      }
     }) ;
    }
    if (dataSourceChangedEvent.action === "edit") {
      this.TaskService.updateRecord(dataSourceChangedEvent).subscribe(() => {
        if (dataSourceChangedEvent.endEdit){
        dataSourceChangedEvent.endEdit();
        }
      });
    }
    if (dataSourceChangedEvent.requestType === "delete") {
      this.TaskService.deleteRecord(dataSourceChangedEvent).subscribe(() => {
        if (dataSourceChangedEvent.endEdit){
        dataSourceChangedEvent.endEdit();
        }
      });
    }
 
  }

}
