import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { Tache } from 'src/app/models/tache';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-edit-status-task',
  templateUrl: './edit-status-task.component.html',
  styleUrls: ['./edit-status-task.component.css']
})
export class EditStatusTaskComponent {

  employes: any[] = [];
  employesProject: any[] = [];
  public taskForm!: FormGroup;
  projetActuel!: Project;
  idProjet: any;
  taches: any;
  dataSource: any;
  idTask: any;
  Task!: Tache;

  statuts: string[] = ['En cours', 'Terminé'];
  selectedStatut: string = '';


  constructor(private projectservoce: ProjectService,
    private _dialogRef: DialogRef<EditStatusTaskComponent>,
    private employeeService: EmployeeserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.projetActuel = this.data.projetActuel;
    this.idProjet = this.data.idProject;
    this.idTask = this.data.idTask;
    this.Task = this.data.task;

    console.log('%cedit-sub-task.component.ts line:64 this.taskForm.valueaaa', 'color: #007acc;', this.projetActuel);


    this.taskForm = this.fb.group({
      id: [this.Task.id],
      libelle: [this.Task.libelle],
      heureVendu: [this.Task.heureVendu],
      progression: [0],
      statut: [''],
      employes: [this.Task.employes],
      spenttime:[]
    }

    );

  }







  changeStatus() {


    const indexOfTask = this.projetActuel.taches.findIndex((t: { id: any; }) => t.id === this.idTask);

    if (indexOfTask !== -1) {
      if (!this.projetActuel.taches) {
        this.projetActuel.taches = []; // Créez le tableau s'il n'existe pas encore
      }

      var calcTask = 0;

      calcTask = this.projetActuel.taches.length;

      if (!this.projetActuel.taches[indexOfTask].sousTaches || this.projetActuel.taches[indexOfTask].sousTaches.length === 0) {

        var purcTask = 100 / calcTask;
        var purcTask = purcTask / calcTask;

        if (this.taskForm.value.statut == 'Terminé') {
          this.taskForm.value.progression = purcTask;
        }

        this.projetActuel.taches.splice(indexOfTask, 1);

        this.projetActuel.taches.push(this.taskForm.value);

        this.projetActuel.progression = this.projetActuel.progression + purcTask;

        if (this.taskForm.value.statut == 'En cours') {
          this.projetActuel.statut = 'En cours';
        }

        if (this.taskForm.value.statut == 'Terminé') {
          this.projetActuel.progression = this.projetActuel.progression + purcTask;
          this.projetActuel.spenttime = this.projetActuel.spenttime + this.taskForm.value.spenttime;
          
        }


        const allTasksCompleted = this.projetActuel.taches.every(task => task.statut === 'Terminé');
        if (allTasksCompleted) {
          this.projetActuel.statut='Terminé';
        }
  
      
      }

      this.projectservoce.updateProject(this.projetActuel).subscribe(
        response => {
          console.log('Projet mis à jour avec la nouvelle tâche :', response);
          alert('tâche mis à jour avec succées');

        },
        error => {
          console.error('Erreur lors de la mise à jour du projet :', error);
        }
      );

      console.log('%cadd-task.component.ts line:67 this.taskForm.value', 'color: #007acc;', this.taskForm.value);
    } else {
      console.error('Tâche non trouvée');
    }
  }



}