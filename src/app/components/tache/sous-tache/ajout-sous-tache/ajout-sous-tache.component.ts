import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { SousTache } from 'src/app/models/soustache';
import { ProjectService } from 'src/app/Services/project.service';
import { AddSubTaskComponent } from '../add-sub-task/add-sub-task.component';
import { EditSubTaskComponent } from '../edit-sub-task/edit-sub-task.component';

@Component({
  selector: 'app-ajout-sous-tache',
  templateUrl: './ajout-sous-tache.component.html',
  styleUrls: ['./ajout-sous-tache.component.css']
})
export class AjoutSousTacheComponent {
  subtaskForm!: FormGroup;
  idProject!: number;
  idTask!: number;
  subTasks: SousTache[]=[];
  @Output() projetActuel!: Project;
  tachesToDisplay!: SousTache[];
  libelle: any;
  project: any;

  ngOnInit(): void {
    this.idProject = +this.route.snapshot.paramMap.get('idProject')!;
    this.idTask = +this.route.snapshot.paramMap.get('idTask')!;

  this.getTasks();

  }
  getTasks() {
    this.projectService.getOneProject(this.idProject).subscribe(
      (projectDetails: Project) => {

        const task = projectDetails.taches.find((task: any) => task.id == this.idTask);


        if (task) {
          this.libelle = task.libelle;
          this.subTasks = task.sousTaches;
          console.log('%cajout-sous-tache.component.ts line:35 object', 'color: #007acc;', this.subTasks);

          this.projetActuel = projectDetails;
          console.log('%cajout-sous-tache.component.ts line:40 this.this.projetActuel ', 'color: #007acc;', this.projetActuel );

          this.tachesToDisplay = task.sousTaches; // Display sub-tasks
        } else {
          console.error('Task not found');
        }
      },
      (error: any) => {
        console.error('Error fetching project details', error);
      }
    );  }


  constructor(private fb: FormBuilder,
    private _dialog: MatDialog, private route: ActivatedRoute, private projectService: ProjectService) {
    this.subtaskForm = fb.group({});
    this.subTasks = [];
    this.tachesToDisplay = this.subTasks;
  }

  openAjoutSubTask() {
    return this._dialog.open(AddSubTaskComponent, {
      data: {
        projetActuel: this.projetActuel,
        idProject: this.idProject,
        idTask: this.idTask
      }
    });
      /*.afterClosed().subscribe(result => {
        this.refreshTaskList(); // Actualiser la liste des sous tâches
      });*/
  }

  

 

  refreshTaskList() {

    window.location.reload();
  }

}
