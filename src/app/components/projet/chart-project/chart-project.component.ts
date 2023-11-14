import { Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ProjectService } from 'src/app/Services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ChartType } from 'chart.js';
import { ChartDataset, ChartOptions } from 'chart.js';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-chart-project',
  templateUrl: './chart-project.component.html',
  styleUrls: ['./chart-project.component.css']
})
export class ChartProjectComponent implements OnInit {
  idProject!: number;
  projetActuel!: Project;
  percentageCompleted: number=0;
  totalNumberOfEmployees: number | undefined;
  public basicchartType: ChartType = 'line';

  public chartData: ChartData = {
    datasets: []
  };  
  
  
  public chartLabels: string[] = ['Tâches terminées']; // Exemple de libellés pour le graphique
  completedTasks: any;
  progressedTasks: any;
  createdTasks: any;
  chartLegend = true;

  constructor(private projectService: ProjectService, private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.idProject = +this.route.snapshot.paramMap.get('idProject')!;

    this.projectService.getOneProject(this.idProject).subscribe(res => {
      this.projetActuel = res;

      this.completedTasks = this.projetActuel.taches.filter(task => task.statut === 'Terminé');
      this.createdTasks = this.projetActuel.taches.filter(task => task.statut === 'Crée');
      this.progressedTasks = this.projetActuel.taches.filter(task => task.statut === 'En cours');

      const numberOfCompletedTasks = this.completedTasks.length;
      const totalNumberOfTasks = this.projetActuel.taches.length;
      this.totalNumberOfEmployees = this.projetActuel.employes.length;

      if(totalNumberOfTasks>0){
      this.percentageCompleted = (numberOfCompletedTasks / totalNumberOfTasks) * 100;
      }
      else{
        this.percentageCompleted = 0;
      }
      console.log('%cchart-project.component.ts line:38 his.percentageCompleted', 'color: #007acc;', this.percentageCompleted);

      this.chartData = {
        labels: ['Crée','En cours', 'Terminé'], 
        datasets: [
          {
            data: [this.createdTasks.length, this.progressedTasks.length, this.completedTasks.length],
            label: 'Statuts',
            backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'] // Background colors for each segment
          }
        ]
      };
       
      // this.taches = res.taches;
      //this.tachesToDisplay = this.taches;

    });

  }

  


}

 
