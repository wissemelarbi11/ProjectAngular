import { DialogRef } from '@angular/cdk/dialog';
import { AfterViewInit, Component, Input, OnInit, EventEmitter, Output, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { Tache } from 'src/app/models/tache';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';
import { ProjectService } from 'src/app/Services/project.service';
import { TacheService } from 'src/app/Services/tache.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  employes: any[] = [];

  public taskForm!: FormGroup;
  projetActuel: any;
  idProjet: any;
  taches: any;
  dataSource: any;


  ngOnInit(): void {

    this.projetActuel = this.data.projet;
    this.taches = this.data.projet.taches;
    this.idProjet = this.data.idProjet;

    this.taskForm = this.fb.group({
      id: [''],
      libelle: [''],
      heureVendu: [''],
      progression: [0],
      statut: ['Crée'],
      employes: [[]],
      sousTaches: [[]],
      spenttime: 0
    }

    );

    this.getEmp();

  }

  constructor(private projectservoce: ProjectService,
    private _dialogRef: DialogRef<AddTaskComponent>,
    private employeeService: EmployeeserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
  }

  saveTask() {

    this.projetActuel.taches.push(this.taskForm.value);
    this.projectservoce.updateProject(this.projetActuel).subscribe(
      response => {
        console.log('Projet mis à jour avec la nouvelle tâche :', response);
        alert('Projet mis à jour avec la nouvelle tâche');

      },
      error => {
        console.error('Erreur lors de la mise à jour du projet :', error);
      }
    );
    console.log('%cadd-task.component.ts line:67 this.taskForm.value', 'color: #007acc;', this.taskForm.value);

  }

  extractFormData(formData: any): any {
    const extractedData: any = {};
    Object.keys(formData).forEach((key: string) => {
      if (formData[key] instanceof FormControl) {
        extractedData[key] = formData[key].value;
      } else if (formData[key] instanceof Object) {
        extractedData[key] = this.extractFormData(formData[key]);
      } else {
        extractedData[key] = formData[key];
      }
    });
    return extractedData;
  }

  getEmp() {
    this.employeeService.getEmployees().subscribe(
      (allEmployees: any[]) => {
        this.projectservoce.getOneProject(this.idProjet).subscribe(
          (project: any) => {
            const projectEmployeeIds = project.employes;

            // Filtrer la liste complète des employés en fonction des employés du projet actuel
            this.employes = allEmployees.filter(employee => projectEmployeeIds.includes(employee.id));
          },
          (projectError: any) => {
            console.error('Erreur lors de la récupération du projet', projectError);
          }
        );
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des employés', error);
      }
    );
  }

}


