import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/Services/project.service';
import { Project } from 'src/app/models/project';
import { AjoutProjectComponent } from '../ajout-project/ajout-project.component';
import { Router } from '@angular/router';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';
import { Employee } from 'src/app/models/employee';
import { AjouttacheComponent } from '../../tache/ajouttache/ajouttache.component';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  @Input() nomProject: any;
  displayedColumns: string[] = ['id', 'nomProjet', 'heureVendu','echeance' ,'statut','spenttime', 'progression', 'employees', 'action'];
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
  projects$!: Observable<Project[]>;
  employees: Employee[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentDate: Date | undefined;

  clickproject: boolean = false;
  clickemp: boolean = false;
  
  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeserviceService,
    private router: Router,
    private _dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getProjectList();
    this.getEmployees();

    this.currentDate = new Date();

  }

  isOverdue(element: any): boolean {
    const currentDate = new Date();
    const echeanceDate = new Date(element.echeance);

    return echeanceDate < currentDate ;
  }

  onConsulte(projet: Project) {
    this.projectService.setShareProjet(projet);
    this.router.navigate(['/projet', projet.id]);
  }

  openAjoutProject() {
    return this._dialog.open(AjoutProjectComponent, {

    });
   
  }

  refreshTaskList() {

    window.location.reload();
  }

  getProjectList() {
    this.projectService.getProjectList().subscribe({
      next: (projects) => {
        this.dataSource = new MatTableDataSource(projects);
        this.dataSource.paginator = this.paginator;
      },
      error: console.error
    });
  }


  deleteProject(idProject: number) {
    this.projectService.deleteProject(idProject).subscribe({
      next: () => {
        alert('Projet supprimé');
        this.getProjectList();
      },
      error: console.error,
    });
  }


  editProject(idProject: number) {
    this.projectService.getProjectDetails(idProject).subscribe((projectDetails) => {
      // Faites ce que vous voulez avec les détails du projet pour l'édition
      console.log('Détails du projet à éditer :', projectDetails);
    });
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        console.log('Employees:', this.employees);
      },
      error: console.error
    });
  }

  getEmployeeName(employeeId: number): string {
    
    console.log('Employee ID:', employeeId);
    console.log('All Employees:', this.employees);
    const employee = this.employees.find(e => e.id === employeeId);
    console.log('Found Employee:', employee);
    return employee ? employee.Nom : '';
  }


  getEmployeeNames(employeeIds: number[]): string {
    const employeeNames = employeeIds.map(employeeId => this.getEmployeeName(employeeId));
    return employeeNames.join(', ');
  }


}
