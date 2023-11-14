import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private apiUrl = 'http://localhost:3000/projects/taches';

  constructor(private http: HttpClient) { }
  sharedTache!: Tache;
  getShareTache(): Tache {
    return this.sharedTache;
  }

  setShareTache(tache: Tache): void {

    this.sharedTache = tache;
  }
  getTaches(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/projects/${id}/Tache`);
  }
  getOneTache(id: number, idProject: number): Observable<Tache> {
    return this.http.get<Tache>(`http://localhost:3000/projects/${idProject}/Tache/${id}`);
  }

  updateTaches(id: number, taches: Tache[]): Observable<any> {

    return this.http.put(`http://localhost:3000/projects/${id}`, { taches });
  }

  addTache(id: number, formData: any): Observable<any> {

    return this.http.post(`http://localhost:3000/projects/${id}/Tache`, formData);
  }
  deleteTask(id: number) {
    return this.http.delete(`http://localhost:3000/Tache/` + id);
  }

  getTachesForProjet(projetId: number):  Observable<any> {
    return this.http.get<any>(`http://localhost:3000/projects/${projetId}/taches`);
  }

}


