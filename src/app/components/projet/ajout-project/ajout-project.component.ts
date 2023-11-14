import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { ControlContainer } from '@angular/forms';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ProjectService } from 'src/app/Services/project.service';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';



@Component({
  selector: 'app-ajout-project',
  templateUrl: './ajout-project.component.html',
  styleUrls: ['./ajout-project.component.css']
})
export class AjoutProjectComponent implements OnInit {
  // @Output() projectAdded: EventEmitter<any> = new EventEmitter<any>();

  employes: any[] = [];

  public projectForm!: FormGroup;


  ngOnInit(): void {
    this.projectForm = this.fb.group({
      id: [''],
      nomProjet: [''],
      heureVendu: [''],
      progression: [0],
      echeance: [''],
      statut: ["Crée"],
      employes: [[]],
      taches: [[]],
      spenttime:0

    }

    );

    this.getEmp();

  }

  constructor(private projectservoce: ProjectService,
    private _dialogRef: DialogRef<AjoutProjectComponent>,
    private employeeService: EmployeeserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
  }

  saveProject() {

    console.log('%cajout-project.component.ts line:46 this.projectForm.value', 'color: #007acc;', this.projectForm.value);

    this.projectservoce.AjouterProject(this.projectForm.value).subscribe(
      (response: any) => {
        alert('Projet ajouté avec succès');
        // this.projectAdded.emit(response);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du projet', error);
      }
    );


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
  onFormSubmit() {
    console.log(this.projectForm);
    this.saveProject();
  }


  getEmp() {
    this.employeeService.getEmployees().subscribe(
      (employees: any[]) => {
        this.employes = employees;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des employés', error);
      }
    );
  }

}


