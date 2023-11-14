import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit{
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
