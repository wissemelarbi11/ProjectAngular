import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  sharedProject!: Project;
  private apiUrl = 'http://localhost:3000/projects';

  constructor(public httpClient: HttpClient) { }

  AjouterProject(formData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, formData); 
  }


  public getProjectList():  Observable<any> {
    console.log('%cproject.service.ts line:21 this.apiUrl', 'color: #007acc;', this.apiUrl);
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }
  

  deleteProject(idProject: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${idProject}`); 
  }

  setShareProjet(projet: Project): void {
    this.sharedProject = projet;
  }

  getOneProject(idProject: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.apiUrl}/${idProject}`); 
  }

  getShareProject(): Project {
    return this.sharedProject;
  }

  getProjetName(idProject: number): Observable<string> {
    const url = `${this.apiUrl}/projects/${idProject}`; 
    return this.httpClient.get<any>(url).pipe(
      map(data => data.nomProjet),
      catchError(error => {
        console.error('Erreur lors de la récupération du nom du projet', error);
        throw error;
      })
    );
  }

  getProjectDetails(idProject: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.apiUrl}/projects/${idProject}`); 
  }

  updateProject(project: any): Observable<any> {
    const url = `${this.apiUrl}/${project.id}`;
    return this.httpClient.put(url, project);
  }



}
