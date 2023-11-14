import { AfterViewInit, Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { Tache } from 'src/app/models/tache';
import { ProjectService } from 'src/app/Services/project.service';
import { TacheService } from 'src/app/Services/tache.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { NbWindowService } from '@nebular/theme';
import { Employee } from 'src/app/models/employee';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';

@Component({
  selector: 'app-ajouttache',
  templateUrl: './ajouttache.component.html',
  styleUrls: ['./ajouttache.component.css']
})
export class AjouttacheComponent implements OnInit {
  @ViewChild('addTaskButton') addTaskButton: any;
  @Output() idProject!: number;
  title = "Ajouter tache"
  taskForm!: FormGroup;
  @Output() taches: Tache[]=[];
  tachesToDisplay!: Tache[];
  @Output() projetActuel!: Project;
  nomProject: string | undefined;
  valeurStockee: string | null;
  employes!: Employee[];

  constructor(private fb: FormBuilder,private employeeService:EmployeeserviceService,
    private _dialog: MatDialog,
    private tacheService: TacheService, private route: ActivatedRoute, private projectService: ProjectService) {
    this.taskForm = fb.group({});
    this.taches = [];
    this.tachesToDisplay = this.taches;
    this.valeurStockee = localStorage.getItem('Nom');

  }

  ngOnInit(): void {
    this.idProject = +this.route.snapshot.paramMap.get('idProject')!;
    console.log('%cajouttache.component.ts line:36 this.idProject', 'color: #007acc;', this.idProject);
    this.taskForm = this.fb.group({
      nomTache: this.fb.control(''),
      heureVendu: this.fb.control('')
    });

    this.projectService.getOneProject(this.idProject).subscribe(
      (res: Project) => {
        this.projetActuel = res;
        console.log('%cajouttache.component.ts line:47  this.projetActuel', 'color: #007acc;',  this.projetActuel);
        this.taches = res.taches;
      this.tachesToDisplay = this.taches;
    });


  }
  clearForm() {
    this.nomTache.setValue('');
    this.heureVendu.setValue(null);
  }
  public get nomTache(): FormControl {
    return this.taskForm.get('nomTache') as FormControl;
  }
  public get heureVendu(): FormControl {
    return this.taskForm.get('heureVendu') as FormControl;
  }
  public get id(): FormControl {
    return this.taskForm.get('id') as FormControl;
  }

  openAjoutTask() {
    return this._dialog.open(AddTaskComponent, {
      data: {
        projet: this.projetActuel,
        idProjet: this.idProject
      }
    })
    .afterClosed().subscribe(result => {

      this.refreshTaskList(); // Actualiser la liste des tâches
    });
  }

  refreshTaskList() {

    window.location.reload();
  }



  
  


}
