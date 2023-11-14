import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { SousTache } from 'src/app/models/soustache';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';
import { ProjectService } from 'src/app/Services/project.service';
import { SoustacheService } from 'src/app/Services/soustache.service';
import { TacheService } from 'src/app/Services/tache.service';

@Component({
  selector: 'app-sous-tache',
  templateUrl: './sous-tache.component.html',
  styleUrls: ['./sous-tache.component.css']
})
export class SousTacheComponent implements OnInit {
  public idProject!:number;
  public project:any;

  ngOnInit(): void {
    const ids=this.route.snapshot.paramMap.get('id');
    if(ids!==null){
      const id = parseInt(ids,10);
      this.idProject = id;}
      if(this.projectService.getShareProject() === undefined){
        this.projectService.getOneProject(this.idProject).subscribe(item =>{
         // this.project = item.data() as Project;
        });
      } else {
        this.project = this.projectService.getShareProject() as Project;
      }
  }
  constructor(private route:ActivatedRoute,private projectService:ProjectService){}





}