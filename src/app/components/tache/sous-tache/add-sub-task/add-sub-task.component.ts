import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-add-sub-task',
  templateUrl: './add-sub-task.component.html',
  styleUrls: ['./add-sub-task.component.css']
})
export class AddSubTaskComponent {


  employes: any[] = [];
  employesProject: any[] = [];
  public subtaskForm!: FormGroup;
  projetActuel!: Project;
  idProjet: any;
  taches: any;
  dataSource: any;
  idTask: any;

  constructor(private projectservoce: ProjectService,
    private _dialogRef: DialogRef<AddSubTaskComponent>,
    private employeeService: EmployeeserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.projetActuel = this.data.projetActuel;
    this.idProjet = this.data.idProject;
    this.idTask = this.data.idTask;

    this.subtaskForm = this.fb.group({
      id: [''],
      libelle: [''],
      heureVendu: [''],
      progression: [0],
      statut: ['Crée'],
      employes: [[]],
      spenttime:0
    }

    );

    this.getEmp();

  }


  saveSubTask() {
    console.log('%cadd-sub-task.component.ts line:56  this.projetActuel00', 'color: #007acc;',  this.projetActuel);

    const indexOfTask = this.projetActuel.taches.findIndex((t: { id: any; }) => t.id === this.idTask);
    if (indexOfTask !== -1) {
      if (!this.projetActuel.taches[indexOfTask].sousTaches) {
        this.projetActuel.taches[indexOfTask].sousTaches = []; // Créez le tableau s'il n'existe pas encore
      }
  
      this.projetActuel.taches[indexOfTask].sousTaches.push(this.subtaskForm.value);
      
      this.projectservoce.updateProject(this.projetActuel).subscribe(
        response => {
          console.log('Projet mis à jour avec la nouvelle tâche :', response);
          alert('tâche mis à jour avec la nouvelle sous tâche');

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
  


  getEmp() {
    this.employeeService.getEmployees().subscribe(
      (allEmployees: any[]) => {
        this.projectservoce.getOneProject(this.idProjet).subscribe(
          (project: any) => {
            const projectEmployeeIds = project.employes;
  
            // Filtrer la liste complète des employés en fonction des employés du projet actuel
            const filteredEmployees = allEmployees.filter(employee => projectEmployeeIds.includes(employee.id));
  
            // Filtrer davantage par l'ID de la tâche
            const filteredEmployeesByTask = filteredEmployees.filter(employee => {
              const task = project.taches.find((t: any) => t.id === this.idTask);
              return task && task.employes.includes(employee.id);
            });
  
            this.employes = filteredEmployeesByTask;
  
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
