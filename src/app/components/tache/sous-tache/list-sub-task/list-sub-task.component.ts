import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { SousTache } from 'src/app/models/soustache';
import { EmployeeserviceService } from 'src/app/Services/employeeservice.service';
import { ProjectService } from 'src/app/Services/project.service';
import { EditSubTaskComponent } from '../edit-sub-task/edit-sub-task.component';

@Component({
  selector: 'app-list-sub-task',
  templateUrl: './list-sub-task.component.html',
  styleUrls: ['./list-sub-task.component.css']
})
export class ListSubTaskComponent {

  public subTasks: SousTache[] = [];
  idTask: any;
  idProject: any;

  displayedColumns: string[] = ['id', 'libelle', 'heureVendu', 'statut', 'spenttime' , 'progression', 'employees', 'action'];
  dataSource!: MatTableDataSource<SousTache>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employees: Employee[] = [];
  @Input() projetActuel!: Project;

  constructor(private _dialog: MatDialog,private route: ActivatedRoute, private employeeService: EmployeeserviceService,
    private router: Router, private projectService: ProjectService) {
  }


  ngOnInit() {

    this.idProject = +this.route.snapshot.paramMap.get('idProject')!;
    this.idTask = +this.route.snapshot.paramMap.get('idTask')!;

    this.projectService.getOneProject(this.idProject).subscribe(
      (projectDetails: any) => {

        const task = projectDetails.taches.find((task: any) => task.id === this.idTask);

        if (task) {
          this.subTasks = task.sousTaches;
          console.log('this.subTasks20', this.subTasks);
          this.dataSource = new MatTableDataSource(this.subTasks);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        } else {
          console.error('Task not found');
        }
      },
      (error: any) => {
        console.error('Error fetching project details', error);
      }
    );

    console.log('%clist-sub-task.component.ts line:36  this.subTasks', 'color: #007acc;', this.subTasks);

this.getEmployeesForSubTasks();

  }

  getEmployeesForSubTasks() {
    // Fetch all employees
    this.employeeService.getEmployees().subscribe(
      (allEmployees: any[]) => {
        // Fetch details of the specific project
        this.projectService.getOneProject(this.idProject).subscribe(
          (project: any) => {
            const task = project.taches.find((t: any) => t.id === this.idTask);
            if (task) {
              const subTaskEmployeeIds: any[] = []; // Create an array to store employee IDs associated with the sub-tasks
  
              // Iterate through sub-tasks of the task and collect employee IDs
              task.sousTaches.forEach((subTask: any) => {
                subTask.employes.forEach((employeeId: any) => {
                  subTaskEmployeeIds.push(employeeId);
                });
              });
  
              // Filter the complete list of employees based on employee IDs of the sub-tasks
              this.employees = allEmployees.filter(employee => subTaskEmployeeIds.includes(employee.id));
            } else {
              console.error('Task not found');
            }
          },
          (projectError: any) => {
            console.error('Error fetching project details', projectError);
          }
        );
      },
      (error: any) => {
        console.error('Error fetching employees', error);
      }
    );
  }
  


  getEmployeeNames(employeeIds: (number | undefined)[]): string {
    const validEmployeeIds = employeeIds.filter(id => typeof id === 'number');
    const assignedEmployees = this.employees.filter(emp => validEmployeeIds.includes(emp.id));
    return assignedEmployees.map(emp => emp.Nom).join(', ');
  }

  deleteSubTask(subTask: SousTache) {
    this.projectService.getOneProject(this.idProject).subscribe(
      (project: Project) => {
        const task = project.taches.find(t => t.id === this.idTask);

        if (task) {
          const subTaskIndex = task.sousTaches.findIndex(st => st.id === subTask.id);

          if (subTaskIndex !== -1) {
            task.sousTaches.splice(subTaskIndex, 1); // Retirer la sous-tâche du tableau
            this.projectService.updateProject(project).subscribe(
              response => {
                console.log('Projet mis à jour avec la suppression de la sous-tâche :', response);
                alert('La sous-tâche a été supprimée avec succès.');
                this.ngOnInit();
              },
              error => {
                console.error('Erreur lors de la mise à jour du projet :', error);
              }
            );
          } else {
            console.error('Sous-tâche non trouvée');
          }
        } else {
          console.error('Tâche non trouvée');
        }
      },
      error => {
        console.error('Erreur lors de la récupération du projet :', error);
      }
    );
  }

  openDialogEditSubTask(SubTask: SousTache) {
    return this._dialog.open(EditSubTaskComponent, {
      data: {
        projetActuel: this.projetActuel,
        idProject: this.idProject,
        idTask: this.idTask,
        idSubTask: SubTask.id,
        SubTask: SubTask
      }
    });
    /*  .afterClosed().subscribe(result => {
        this.refreshTaskList(); // Actualiser la liste des sous tâches
      });*/
  }
  refreshTaskList() {
    window.location.reload();
  }


}
