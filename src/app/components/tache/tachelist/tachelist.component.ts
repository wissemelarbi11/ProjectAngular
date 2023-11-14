import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { Tache } from 'src/app/models/tache';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';
import { ProjectService } from 'src/app/Services/project.service';
import { TacheService } from 'src/app/Services/tache.service';
import { EditStatusTaskComponent } from '../edit-status-task/edit-status-task.component';

@Component({
  selector: 'app-tachelist',
  templateUrl: './tachelist.component.html',
  styleUrls: ['./tachelist.component.css']
})
export class TachelistComponent implements OnInit {


  nomProjet$!: Observable<string>;
  @Output() onRemoveTask = new EventEmitter<number>();
  @Output() onEditTask = new EventEmitter<number>();
  displayedColumns: string[] = ['id', 'libelle', 'heureVendu', 'statut','spenttime', 'progression', 'employees', 'action'];
  dataSource!: MatTableDataSource<Tache>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() projetActuel!: Project;
  @Input() idProject: any;
  @Input() taches!: Tache[];
  employees: Employee[] = [];

  constructor(private _dialog: MatDialog,
    private route: ActivatedRoute, private employeeService: EmployeeserviceService,
    private router: Router, private tacheService: TacheService, private projectService: ProjectService) {

  }
  ngOnInit() {
    

    console.log('%ctachelist.component.ts line:36 this.projetActuel?.taches', 'color: #007acc;', this.taches);

    this.dataSource = new MatTableDataSource(this.taches);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getEmployeesForTasks();

  }

 
  editTaskClicked(tache: Tache) {
    this.onEditTask.emit(tache.id);
  }
  onNavigateDetail(tache: Tache) {
    console.log('tache:', tache);
    this.tacheService.setShareTache(tache);
    this.router.navigate(['/projet', this.idProject, 'sous-tache', tache.id]);

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteTask(tache: any) {
    const index = this.projetActuel.taches.findIndex((t: any) => t.id === tache.id);
    console.log('%ctachelist.component.ts line:92 index', 'color: #007acc;', index);
    if (index !== -1) {
      this.projetActuel.taches.splice(index, 1); // Retirer la tâche du tableau
      this.projectService.updateProject(this.projetActuel).subscribe(
        response => {
          console.log('Projet mis à jour avec la suppression de cette tâche :', response);
          alert('La tâche a été supprimée avec succès.');
          this.ngOnInit();
        },
        error => {
          console.error('Erreur lors de la mise à jour du projet :', error);
        }
      );
    }
  }


  getEmployeesForTasks() {
    // Fetch all employees
    this.employeeService.getEmployees().subscribe(
      (allEmployees: any[]) => {
        // Fetch details of the specific project
        this.projectService.getOneProject(this.idProject).subscribe(
          (project: any) => {
            const projectEmployeeIds = project.employes;
  
            // Filtrer la liste complète des employés en fonction des employés du projet actuel
            this.employees = allEmployees.filter(employee => projectEmployeeIds.includes(employee.id));
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
  
  
  



  getEmployeeNames(employeeIds: (number | undefined)[]): string {
    const validEmployeeIds = employeeIds.filter(id => typeof id === 'number');
    const assignedEmployees = this.employees.filter(emp => validEmployeeIds.includes(emp.id));
    return assignedEmployees.map(emp => emp.Nom).join(', ');
  }


  openDialogEditTask(Task:Tache){
    return this._dialog.open(EditStatusTaskComponent, {
      data: {
        projetActuel: this.projetActuel,
        idProject: this.idProject,
        idTask: Task.id,
        task: Task
      }
    });
    /*  .afterClosed().subscribe(result => {
        window.location.reload(); // Actualiser la liste des sous tâches
      });*/
  }


}


