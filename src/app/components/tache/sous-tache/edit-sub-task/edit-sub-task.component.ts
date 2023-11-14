import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';
import { ProjectService } from 'src/app/Services/project.service';
import { SousTache } from 'src/app/models/soustache';

@Component({
  selector: 'app-edit-sub-task',
  templateUrl: './edit-sub-task.component.html',
  styleUrls: ['./edit-sub-task.component.css']
})
export class EditSubTaskComponent {


  employes: any[] = [];
  employesProject: any[] = [];
  public subtaskForm!: FormGroup;
  projetActuel!: Project;
  idProjet: any;
  taches: any;
  dataSource: any;
  idTask: any;
  idSubTask: any;
  subTask!: SousTache;

  statuts: string[] = ['En cours', 'Terminé'];
  selectedStatut: string = '';


  constructor(private projectservoce: ProjectService,
    private _dialogRef: DialogRef<EditSubTaskComponent>,
    private employeeService: EmployeeserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.projetActuel = this.data.projetActuel;
    this.idProjet = this.data.idProject;
    this.idTask = this.data.idTask;
    this.idSubTask = this.data.idSubTask;
    this.subTask = this.data.SubTask;

    console.log('%cedit-sub-task.component.ts line:64 this.subtaskForm.valueaaa', 'color: #007acc;', this.projetActuel);

    console.log('%cedit-sub-task.component.ts line:47 object', 'color: #007acc;', this.subTask);

    this.subtaskForm = this.fb.group({
      id: [this.subTask.id],
      libelle: [this.subTask.libelle],
      heureVendu: [this.subTask.heureVendu],
      progression: [],
      statut: [''],
      employes: [this.subTask.employes],
      spenttime: [this.subTask.spenttime]
    }

    );

  }


  changeStatus() {


    const indexOfTask = this.projetActuel.taches.findIndex((t: { id: any; }) => t.id === this.idTask);
    const indexOfSubTask = this.projetActuel.taches[indexOfTask].sousTaches.findIndex((t: { id: any; }) => t.id === this.idSubTask);

    if (indexOfTask !== -1) {
      if (!this.projetActuel.taches[indexOfTask].sousTaches) {
        this.projetActuel.taches[indexOfTask].sousTaches = []; // Créez le tableau s'il n'existe pas encore
      }

      var calcTask = 0, calcSubTask = 0;

      calcTask = this.projetActuel.taches.length;
      calcSubTask = this.projetActuel.taches[indexOfTask].sousTaches.length;


      console.log('%cedit-sub-task.component.ts line:83 calcTask',
        'color: #007acc;', calcTask);

      console.log('%cedit-sub-task.component.ts line:86 object', 'color: #007acc;', calcSubTask);


      var purcTask = 100 / calcTask;
      var purcSubTask = purcTask / calcSubTask;


      if (this.subtaskForm.value.statut == 'Terminé') {
        this.subtaskForm.value.progression = purcSubTask;
      }

      this.projetActuel.taches[indexOfTask].sousTaches.splice(indexOfSubTask, 1);

      this.projetActuel.taches[indexOfTask].sousTaches.push(this.subtaskForm.value);

      this.projetActuel.taches[indexOfTask].progression = this.projetActuel.taches[indexOfTask].progression + purcSubTask;

      if (this.subtaskForm.value.statut == 'En cours') {
        this.projetActuel.taches[indexOfTask].statut = 'En cours';
      }

      const allTasksCompleted = this.projetActuel.taches[indexOfTask].sousTaches.every(task => task.statut === 'Terminé');
      if (allTasksCompleted) {
        this.projetActuel.taches[indexOfTask].statut = 'Terminé';
      }

      if (this.subtaskForm.value.statut == 'Terminé') {
        this.projetActuel.progression = this.projetActuel.progression + purcSubTask;
        this.projetActuel.spenttime = this.projetActuel.spenttime + this.subtaskForm.value.spenttime;
        this.projetActuel.taches[indexOfTask].spenttime = this.projetActuel.taches[indexOfTask].spenttime + this.subtaskForm.value.spenttime;

      }

      const allTasksCompleted2 = this.projetActuel.taches.every(task => task.statut === 'Terminé');
      if (allTasksCompleted2) {
        this.projetActuel.statut='Terminé';
      }


      this.projectservoce.updateProject(this.projetActuel).subscribe(
        response => {
          console.log('Projet mis à jour avec la nouvelle tâche :', response);
          alert(' sous tâche mis à jour avec succées');

        },
        error => {
          console.error('Erreur lors de la mise à jour du projet :', error);
        }
      );

      console.log('%cadd-task.component.ts line:67 this.subtaskForm.value', 'color: #007acc;', this.subtaskForm.value);
    } else {
      console.error('Tâche non trouvée');
    }
  }


}