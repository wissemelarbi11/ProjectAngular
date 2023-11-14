import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, AgendaService, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditService, ToolbarService, TreeGridAllModule } from "@syncfusion/ej2-angular-treegrid";
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TaskDataService } from './Services/task-data.service';
import { MatTreeModule } from '@angular/material/tree';
import { NbIconModule, NbTreeGridModule } from '@nebular/theme';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ProjectlistComponent } from './components/projet/projectlist/projectlist.component';
import { AjoutProjectComponent } from './components/projet/ajout-project/ajout-project.component';
import { RegisterComponent } from './components/register/register.component';
import { AjoutemployeeComponent } from './components/ajoutemployee/ajoutemployee.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProjetComponent } from './components/projet/projet.component';
import { AjouttacheComponent } from './components/tache/ajouttache/ajouttache.component';
import { SousTacheComponent } from './components/tache/sous-tache/sous-tache.component';
import { TestComponent } from './components/test/test.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { TacheComponent } from './components/tache/tache.component';
import { TachelistComponent } from './components/tache/tachelist/tachelist.component';
import { NgProgressModule } from 'ngx-progressbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddTaskComponent } from './components/tache/add-task/add-task.component';
import { AddSubTaskComponent } from './components/tache/sous-tache/add-sub-task/add-sub-task.component';
import { ListSubTaskComponent } from './components/tache/sous-tache/list-sub-task/list-sub-task.component';
import { AjoutSousTacheComponent } from './components/tache/sous-tache/ajout-sous-tache/ajout-sous-tache.component';
import { EditSubTaskComponent } from './components/tache/sous-tache/edit-sub-task/edit-sub-task.component';
import { EditStatusTaskComponent } from './components/tache/edit-status-task/edit-status-task.component';
import { ChartProjectComponent } from './components/projet/chart-project/chart-project.component';
import { NgChartsModule } from 'ng2-charts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const ROUTES: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'projectlist', component: ProjectlistComponent },
  { path: 'ajout-project', component: AjoutProjectComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'ajoutemployee', component: AjoutemployeeComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'projet/:idProject/ajout-tache', component: AjouttacheComponent },
  {path: 'projet/:idProject/sous-tache/:idTask', component: AjoutSousTacheComponent},
  { path: 'test', component: TestComponent },
  { path: 'chart/:idProject', component: ChartProjectComponent},
  { path: 'dashboard', component: DashboardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    ProjectlistComponent,
    AjoutProjectComponent,
    ProjectDetailsComponent,
    RegisterComponent,
    AjoutemployeeComponent,
    EmployeelistComponent,
    SidebarComponent,
    TacheComponent,
    AjouttacheComponent,
    TachelistComponent,
    ProjetComponent,
    SousTacheComponent,
    TestComponent,
    AddTaskComponent,
    AddSubTaskComponent,
    ListSubTaskComponent,
    AjoutSousTacheComponent,
    EditSubTaskComponent,
    EditStatusTaskComponent,
    ChartProjectComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    ScheduleModule,
    RecurrenceEditorModule,
    MatSidenavModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatMenuModule,
    MatInputModule,
    MatListModule,
    MatTreeModule,
    TreeGridAllModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatProgressBarModule,
    TreeGridAllModule,
    NgProgressModule,
    // InMemoryWebApiModule.forRoot(TaskDataService),
    MatDatepickerModule,
    NgChartsModule,
    MatTooltipModule,
    
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, AgendaService, DragAndDropService, ResizeService, EditService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
